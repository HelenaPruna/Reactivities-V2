using Application.Activities.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class AddRecurrence
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required CreateRecurrenceDto RecurrenceDto { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.ActivityId], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            var recur = new RecurrenceActivity
            {
                Date = request.RecurrenceDto.Date,
                TimeStart = request.RecurrenceDto.TimeStart,
                TimeEnd = request.RecurrenceDto.TimeEnd,
                IsRecurrent = false
            };
            activity.Recurrences.Add(recur);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<Unit>.Failure("Failed to add recurrence", 400) : Result<Unit>.Success(Unit.Value);
            

        }
    }
}
