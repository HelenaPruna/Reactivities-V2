using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            var dto = request.ActivityDto;

            var activity = mapper.Map<Activity>(dto);
            activity.CreatorId = user.Id;

            context.Activities.Add(activity);
            await context.SaveChangesAsync(cancellationToken); 

            List<RecurrenceActivity> recurrences = [];
            for (var date = dto.DateStart; date <= dto.DateEnd; date = date.AddDays(dto.Interval))
            {
                var recurrence = new RecurrenceActivity
                {
                    Date = date,
                    TimeStart = dto.TimeStart,
                    TimeEnd = dto.TimeEnd,
                    ActivityId = activity.Id 
                };
                recurrences.Add(recurrence);
            }
            context.Recurrences.AddRange(recurrences);
            await context.SaveChangesAsync(cancellationToken); 

            activity.FirstDateId = recurrences.First(x => x.Date == dto.DateStart).Id;
            await context.SaveChangesAsync(cancellationToken); 

            return Result<string>.Success(activity.Id);
        }
    }
}
