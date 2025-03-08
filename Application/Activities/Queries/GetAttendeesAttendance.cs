using Application.Activities.DTOs;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetAttendeesAttendance
{
    public class Query : IRequest<Result<List<AttendeeAttendanceDto>>>
    {
        public required string Id { get; set; }
        public required DateOnly Date { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<AttendeeAttendanceDto>>>
    {
        public async Task<Result<List<AttendeeAttendanceDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var attendees = await context.Attendees.Where(x => x.ActivityId == request.Id && !x.IsWaiting)
            .Select(a => new AttendeeAttendanceDto
            {
                Id = a.Id,
                Identifier = a.Identifier,
                Comments = a.Comments,
                SkippedDays = a.SkippedDays,
                // If there's an attendance record for the given date, use its value, otherwise default to 0
                HasAttended = a.AttendanceList
                        .Where(att => att.Date == request.Date)
                        .Select(att => att.HasAttended)
                        .FirstOrDefault()
            })
                .ToListAsync(cancellationToken);

            return attendees == null
                ? Result<List<AttendeeAttendanceDto>>.Failure("Attendees not found", 404)
                : Result<List<AttendeeAttendanceDto>>.Success(attendees);


        }
    }
}
