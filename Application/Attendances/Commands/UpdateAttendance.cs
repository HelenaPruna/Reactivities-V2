using Application.Attendances.DTOs;
using Application.Core;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required string RecurrenceId { get; set; }
        public required ICollection<AttendanceDto> AttendanceValues { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var recur = await context.Recurrences.Include(x => x.Attendances).ThenInclude(x => x.Attendee)
                    .FirstOrDefaultAsync(x => x.ActivityId == request.ActivityId
                    && x.Id == request.RecurrenceId, cancellationToken);
            if (recur == null) return Result<Unit>.Failure("Activity not found", 404);
            var attendances = recur.Attendances;
            foreach (var attValue in request.AttendanceValues)
            {
                var attendance = attendances.FirstOrDefault(a => a.AttendeeId == attValue.Id);
                if (attendance != null)
                {
                    if (attendance.HasAttended == 2) attendance.Attendee.SkippedDays -= 1; //En cas de que actualitzem el valor i anteriorment s'havia posat que havia faltat
                    attendance.HasAttended = attValue.HasAttended;
                    await context.SaveChangesAsync(cancellationToken);

                }
                else //no hauria d'arribar mai aquí pk sempre truquem primer al getattendance per aquest mateix valor i llavors el crea pero bueno 
                {
                    attendance = new Attendance
                    {
                        HasAttended = attValue.HasAttended,
                        AttendeeId = attValue.Id
                    };
                    recur.Attendances.Add(attendance);
                    await context.SaveChangesAsync(cancellationToken);
                }
                if (attValue.HasAttended == 2)
                {
                    attendance.Attendee.SkippedDays += 1;
                    await context.SaveChangesAsync(cancellationToken);
                }
            }

            return Result<Unit>.Success(Unit.Value);

        }
    }
}

