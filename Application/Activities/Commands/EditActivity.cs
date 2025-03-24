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

            //nomes es modificaran les recurrences futures
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var tmpRecurList = activity.Recurrences.Where(x => x.IsRecurrent && x.Date >= today).OrderBy(x => x.Date);
            var firstRecur = activity.FirstDate;
            var lastDate = tmpRecurList.Last().Date;

            var numberRecurances = tmpRecurList.Count();
            var counter = dto.Interval == 1 ? 1 : ((dto.DateEnd.DayNumber - dto.DateStart.DayNumber) / dto.Interval) + 1;

            if (firstRecur.Date != dto.DateStart || lastDate != dto.DateEnd || numberRecurances != counter)
            {
                //TODO: elimino totes les ocurrences que existeixin que siguin recurrents, no crec que sigui la forma més correcta 
                foreach (var recur in tmpRecurList) activity.Recurrences.Remove(recur);

                for (var date = dto.DateStart; date <= dto.DateEnd; date = date.AddDays(dto.Interval)) if (date >= today)
                {
                    var recur = new RecurrenceActivity
                    {
                        Date = date,
                        TimeStart = dto.TimeStart,
                        TimeEnd = dto.TimeEnd
                    };
                    activity.Recurrences.Add(recur);
                }
            }
            else
            {
                //only time is modified then nomes actualitzem els temps
                if (firstRecur.TimeStart != dto.TimeStart || firstRecur.TimeEnd != dto.TimeEnd)
                {
                    foreach (var recur in tmpRecurList)
                        {
                            recur.TimeStart = dto.TimeStart;
                            recur.TimeEnd = dto.TimeEnd;
                        }
                }
            }
            activity.FirstDateId = activity.Recurrences.First(x => x.Date == dto.DateStart).Id;

            mapper.Map(request.ActivityDto, activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<Unit>.Failure("Failed to update the activity", 400) : Result<Unit>.Success(Unit.Value);

        }
    }

}
