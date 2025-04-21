using Application.Core;
using Application.Rooms.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rooms.Queries;

public class GetRoomsList
{
    public class Query : IRequest<Result<List<RoomDto>>>
    {
        public required DateOnly FromDate { get; set; }
        public required DateOnly ToDate { get; set; }
    }
    public class IRequestHandler(AppDbContext context, IMapper mapper)
        : IRequestHandler<Query, Result<List<RoomDto>>>
    {
        public async Task<Result<List<RoomDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var rooms = await context.Rooms.Include(r => r.Recurrences).ThenInclude(r => r.Activity)
            .OrderBy(x => x.NumberFloor).Select(room => new RoomDto
            {
                Id = room.Id,
                Capacity = room.Capacity,
                Name = room.Name,
                NumberFloor = room.NumberFloor,
                Recurrences = room.Recurrences
                .Where(r => r.Date >= request.FromDate && r.Date <= request.ToDate)
                .Select(r => mapper.Map<RecurrenceBookingDto>(r))
                .ToList()
            }).ToListAsync(cancellationToken);
            return Result<List<RoomDto>>.Success(rooms);
        }
    }
}
