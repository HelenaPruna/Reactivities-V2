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

            var activity = mapper.Map<Activity>(request.ActivityDto);
            for (var date = dto.DateStart; date <= dto.DateEnd; date = date.AddDays(dto.Interval))
            {
                var recur = new RecurrenceActivity
                {
                    Date = date,
                    TimeStart = dto.TimeStart,
                    TimeEnd = dto.TimeEnd
                };
                activity.Recurrences.Add(recur);
            };
            activity.FirstDateId = activity.Recurrences.First(x => x.Date == dto.DateStart).Id;
            activity.CreatorId = user.Id;
            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<string>.Failure("Failed to create the activity", 400) : Result<string>.Success(activity.Id);
        }
    }
}
