using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class CancelActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(x => x.Recurrences)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            if (!activity.IsCancelled)
            {
                activity.RoomId = null;
                foreach (var recur in activity.Recurrences)
                {
                    recur.RoomId = null;
                }
            }
            activity.IsCancelled = !activity.IsCancelled;
        
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<Unit>.Failure("Failed to change cancellation state the activity", 400) : Result<Unit>.Success(Unit.Value);
        }
    }
}
