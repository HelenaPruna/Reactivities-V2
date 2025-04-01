using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Queries;

public class GetAttendeesAttendance
{
    public class Query : IRequest<Result<List<Attendance>>>
    {
        public required string Id { get; set; }
        public required string RecurrenceId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Attendance>>>
    {
        public async Task<Result<List<Attendance>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var recur = await context.Recurrences.Include(x => x.Attendances).Include(x => x.Activity)
                    .ThenInclude(a => a.Attendees).FirstOrDefaultAsync(x => x.ActivityId == request.Id
                    && x.Id == request.RecurrenceId, cancellationToken);
            if (recur == null) return Result<List<Attendance>>.Failure("Attendance not found", 404);
            var attendees = recur.Activity.Attendees.Where(x => !x.IsWaiting);

            foreach (var att in attendees)
            {
                if (!recur.Attendances.Any(a => a.AttendeeId == att.Id))
                {
                    var attendance = new Attendance
                    {
                        Attendee = att,
                        AttendeeId = att.Id,
                        HasAttended = 0
                    };
                    recur.Attendances.Add(attendance);
                    await context.SaveChangesAsync(cancellationToken);
                }
            }
            var attendances = recur.Attendances.ToList();

            return Result<List<Attendance>>.Success(attendances);


        }
    }
}
