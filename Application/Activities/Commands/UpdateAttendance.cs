using Application.Activities.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required DateOnly Date { get; set; }
        public required ICollection<AttendanceDto> AttendanceValues { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(a => a.Attendees).ThenInclude(u => u.AttendanceList)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            foreach (var Attendee in request.AttendanceValues)
            {
                //TODO: Nss si es la millor forma d'actualitzar l'assistencia. 
                var att = activity.Attendees.FirstOrDefault(x => x.Id == Attendee.Id);
                if (att == null) return Result<Unit>.Failure("Attendee not found", 404);

                var attendance = att.AttendanceList.FirstOrDefault(x => x.Date == request.Date);

                if (attendance != null)
                {
                    att.AttendanceList.Remove(attendance);
                    if (attendance.HasAttended == 2) att.SkippedDays -= 1; //En cas de que actualitzem el valor i anteriorment s'havia posat que havia faltat
                } 

                attendance = new Attendance
                {
                    Date = request.Date,
                    HasAttended = Attendee.HasAttended,
                    AttendeeId = Attendee.Id
                };
                if (Attendee.HasAttended == 2) att.SkippedDays += 1;
                att.AttendanceList.Add(attendance);
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<Unit>.Failure("Failed to update organizers", 400) : Result<Unit>.Success(Unit.Value);

        }
    }
}
