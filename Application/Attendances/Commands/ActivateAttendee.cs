using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Commands;

public class ActivateAttendee
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required string AttendeeId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(x => x.Attendees)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            var attendee = activity.Attendees.FirstOrDefault(x => x.Id == request.AttendeeId);
            if (attendee == null) return Result<Unit>.Failure("Attendee not found", 404);
            attendee.IsWaiting = !attendee.IsWaiting;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to create the attendee", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
