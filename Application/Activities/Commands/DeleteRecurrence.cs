using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteRecurrence
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required string RecurrenceId { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.ActivityId], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            var recurrence = await context.Recurrences.FindAsync([request.RecurrenceId], cancellationToken);
            if (recurrence == null) return Result<Unit>.Failure("Recurrence not found", 404);
            activity.Recurrences.Remove(recurrence);
            context.Recurrences.Remove(recurrence);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to delete the recurrence", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
