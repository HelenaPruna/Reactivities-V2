using Application.Core;
using Application.Rooms.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rooms.Queries;

public class GetAvailableRooms
{
    public class Query : IRequest<Result<List<ActivityRoomDto>>>
    {
        public required string ActivityId { get; set; }
        public bool IsOneTime { get; set; } = false;
        public string? RecurOneTimeId { get; set; }
    }
    public class IRequestHandler(AppDbContext context, IMapper mapper)
        : IRequestHandler<Query, Result<List<ActivityRoomDto>>>
    {
        public async Task<Result<List<ActivityRoomDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(a => a.Recurrences)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
            if (activity == null) return Result<List<ActivityRoomDto>>.Failure("Activity not found", 404);
            IEnumerable<RecurrenceActivity> recurrences;
            if (!request.IsOneTime) recurrences = activity.Recurrences.Where(x => x.IsRecurrent);            
            else recurrences = activity.Recurrences.Where(x => x.Id == request.RecurOneTimeId);
            var recurrencesList = recurrences.Select(rb => new { rb.Date, rb.TimeStart, rb.TimeEnd }).ToList();
            
            var rooms = await context.Rooms.Where(x => x.Capacity >= activity.MaxParticipants)
                .Include(x => x.Recurrences).OrderBy(x => x.Capacity).ThenBy(x => x.NumberFloor).ToListAsync(cancellationToken);

            var availableRooms = rooms.Where(room => !room.Recurrences.Any(r => recurrencesList
                .Any(rb => r.Date == rb.Date && r.TimeStart < rb.TimeEnd && rb.TimeStart < r.TimeEnd)))
                .Select(mapper.Map<ActivityRoomDto>).ToList();
            return Result<List<ActivityRoomDto>>.Success(availableRooms);
        }
    }
}
