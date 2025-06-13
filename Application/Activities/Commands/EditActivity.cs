using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(x => x.Recurrences)
                .Where(x => x.Id == request.ActivityDto.Id).FirstOrDefaultAsync(cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            var dto = request.ActivityDto;
            var isCapacityMod = activity.MaxParticipants < dto.MaxParticipants;

            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var tmpRecurList = activity.Recurrences.Where(x => x.IsRecurrent).OrderBy(x => x.Date).ToList();
            var firstRecur = activity.FirstDate;
            var lastDate = tmpRecurList.Last().Date;
            var counter = dto.Interval == 1 ? 1 : ((dto.DateEnd.DayNumber - dto.DateStart.DayNumber) / dto.Interval) + 1;

            var IsModRecurrences = false;

            if (firstRecur.Date != dto.DateStart || lastDate != dto.DateEnd || tmpRecurList.Count != counter)
            {
                IsModRecurrences = true;
                List<DateOnly> newDates = [];
                for (var date = dto.DateStart; date <= dto.DateEnd; date = date.AddDays(dto.Interval))
                { newDates.Add(date); }

                foreach (var newDate in newDates)
                {
                    var existingRecur = tmpRecurList.FirstOrDefault(x => x.Date == newDate);
                    if (existingRecur != null)
                    {
                        if (existingRecur.TimeStart != dto.TimeStart || existingRecur.TimeEnd != dto.TimeEnd)
                        {
                            existingRecur.TimeStart = dto.TimeStart;
                            existingRecur.TimeEnd = dto.TimeEnd;
                        }
                        tmpRecurList.Remove(existingRecur);
                    }
                    else
                    {
                        var recur = new RecurrenceActivity { Date = newDate, TimeStart = dto.TimeStart, TimeEnd = dto.TimeEnd };
                        activity.Recurrences.Add(recur);
                    }
                }
                foreach (var obsoleteRecur in tmpRecurList) if (obsoleteRecur.Date >= today) //nomes s'eliminaran les que siguin futures, les passades es poden modificar pero no eliminar. 
                    {
                        if (obsoleteRecur.Id == activity.FirstDateId)
                        {
                            activity.FirstDateId = null;
                            await context.SaveChangesAsync(cancellationToken);
                        }
                        activity.Recurrences.Remove(obsoleteRecur);
                        context.Recurrences.Remove(obsoleteRecur);
                    }
                activity.FirstDateId = activity.Recurrences.Where(x => x.IsRecurrent).First(x => x.Date == dto.DateStart && x.TimeStart == dto.TimeStart).Id;
                await context.SaveChangesAsync(cancellationToken);
            }
            else
            {
                //only time is modified then nomes actualitzem els temps de les recurrences.
                if (firstRecur.TimeStart != dto.TimeStart || firstRecur.TimeEnd != dto.TimeEnd)
                {
                    IsModRecurrences = true;
                    foreach (var recur in tmpRecurList)
                    {
                        recur.TimeStart = dto.TimeStart;
                        recur.TimeEnd = dto.TimeEnd;
                    }
                    await context.SaveChangesAsync(cancellationToken);
                }
            }

            //ara revisar que la sala serveix per les recurrences noves
            if ((IsModRecurrences || isCapacityMod) && activity.RoomId != null)
            {
                var room = await context.Rooms.Include(r => r.Recurrences)
                    .FirstOrDefaultAsync(r => r.Id == activity.RoomId, cancellationToken);
                if (room == null) return Result<Unit>.Failure("Failed to find room", 400);
                var IsRoomAvailable = true;
                var updatedRecur = activity.Recurrences.Where(x => x.IsRecurrent && x.Date >= today).ToList();

                if (isCapacityMod && room.Capacity < dto.MaxParticipants) IsRoomAvailable = false;
                else if (IsModRecurrences)
                {
                    IsRoomAvailable = updatedRecur.All(newRecur => !room.Recurrences.Any(exist =>
                    exist.Date == newRecur.Date && exist.Id != newRecur.Id &&
                    newRecur.TimeStart < exist.TimeEnd && newRecur.TimeEnd > exist.TimeStart));
                }

                if (!IsRoomAvailable)
                {
                    activity.RoomId = null;
                    foreach (var recur in updatedRecur) recur.RoomId = null;
                }
                else if(IsModRecurrences)
                {
                    var needRoomAssigned = updatedRecur.Where(x => x.RoomId == null).ToList();
                    foreach (var recur in needRoomAssigned)
                    {
                        recur.RoomId = room.Id;
                        room.Recurrences.Add(recur);
                    }
                }
            }

            if (isCapacityMod)
            {
                var oneTimeRecurList = activity.Recurrences.Where(x => !x.IsRecurrent && x.Date >= today).ToList();
                foreach (var oneTimeRecur in oneTimeRecurList) if (oneTimeRecur.RoomId != null)
                    {
                        var room = await context.Rooms.FirstOrDefaultAsync(r => r.Id == oneTimeRecur.RoomId, cancellationToken);
                        if (room == null) return Result<Unit>.Failure("Failed to find room", 400);
                        if (room.Capacity < dto.MaxParticipants) oneTimeRecur.RoomId = null;
                    }
            }

            mapper.Map(request.ActivityDto, activity);
            if (!context.ChangeTracker.HasChanges()) return Result<Unit>.Success(Unit.Value);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update the activity", 400);
        }
    }

}
