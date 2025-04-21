using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rooms.Commands;

public class BookRoom
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required string RoomId { get; set; }
        public bool IsOneTime { get; set; } = false;
        public string? RecurOneTimeId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(x => x.Recurrences).FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            var room = await context.Rooms.FindAsync([request.RoomId], cancellationToken);
            if (room == null) return Result<Unit>.Failure("Room not found", 404);

            if (!request.IsOneTime)
            {
                var recurrences = activity.Recurrences.Where(r => r.IsRecurrent);
                if( activity.RoomId != null) foreach (var recur in recurrences) recur.RoomId = null; // en cas de que ja hi havia una room assigned             
                activity.RoomId = room.Id;
                foreach (var recur in recurrences) room.Recurrences.Add(recur); 
            }
            else
            {
                var recur = activity.Recurrences.FirstOrDefault(x => x.Id == request.RecurOneTimeId);
                if (recur == null) return Result<Unit>.Failure("Recurrence not found", 404);
                room.Recurrences.Add(recur);
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to book room", 400) 
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
