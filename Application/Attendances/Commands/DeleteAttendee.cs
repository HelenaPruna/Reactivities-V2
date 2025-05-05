using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Commands;

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
            var attendances = context.Attendances.Where(x => x.AttendeeId == attendee.Id);
            if (attendances != null)
            {
                context.Attendances.RemoveRange(attendances);
                await context.SaveChangesAsync(cancellationToken);
            }
            activity.Attendees.Remove(attendee);
            await context.SaveChangesAsync(cancellationToken); 
            context.Attendees.Remove(attendee); // Explicit removal

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to delete the attendee", 400)
                : Result<Unit>.Success(Unit.Value);

        }
    }
}
