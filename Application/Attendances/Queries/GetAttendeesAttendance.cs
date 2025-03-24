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
        public required DateTime Date { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Attendance>>>
    {
        public async Task<Result<List<Attendance>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var recur = await context.Recurrences.Include(x => x.Attendances)
                    .FirstOrDefaultAsync(x => x.ActivityId == request.Id && x.Date == DateOnly.FromDateTime(request.Date)
                        && x.TimeStart == TimeOnly.FromDateTime(request.Date), cancellationToken);
            if (recur == null) return Result<List<Attendance>>.Failure("Attendance not found", 404);
            
            var attendees = recur.Attendances.ToList();
            return attendees == null
                ? Result<List<Attendance>>.Failure("Attendees not found", 404)
                : Result<List<Attendance>>.Success(attendees);


        }
    }
}
