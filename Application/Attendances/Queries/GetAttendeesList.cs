using Application.Attendances.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Queries;

public class GetAttendeesList
{
    public class Query : IRequest<Result<List<AttendeeDto>>>
    {
        public required string Id { get; set; }
        public bool IsWaiting { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<AttendeeDto>>>
    {
        public async Task<Result<List<AttendeeDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var attendees = await context.Attendees.Where(x => x.ActivityId == request.Id && x.IsWaiting == request.IsWaiting)
                .ProjectTo<AttendeeDto>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            return attendees == null
                ? Result<List<AttendeeDto>>.Failure("Attendees not found", 404)
                : Result<List<AttendeeDto>>.Success(attendees);
        }
    }
}
