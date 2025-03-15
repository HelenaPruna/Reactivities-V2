using System.Diagnostics;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteAttendee
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
            var activity = await context.Activities.FindAsync([request.ActivityId], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            var attendee = await context.Attendees.FindAsync([request.AttendeeId], cancellationToken);
            if (attendee == null) return Result<Unit>.Failure("Attendee not found", 404);
            activity.Attendees.Remove(attendee);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to delete the attendee", 400)
                : Result<Unit>.Success(Unit.Value);

        }
    }
}
