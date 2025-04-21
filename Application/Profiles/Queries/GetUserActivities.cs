using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            List<UserActivityDto> activities = [];
            IQueryable<UserActivityDto> query;

            if (request.Filter == "creatorPast" || request.Filter == "creator")
                query = context.Activities.Where(x => x.CreatorId == request.UserId)
                        .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);
            else query = context.ActivityOrganizers.Where(u => u.User.Id == request.UserId)
                        .Select(x => x.Activity).ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);
            if (request.Filter == "creatorPast" || request.Filter == "organizingPast")
                activities = await query.Where(x => x.DateEnd < today).ToListAsync(cancellationToken);
            else activities = await query.Where(x => x.DateEnd >= today).ToListAsync(cancellationToken);

            return Result<List<UserActivityDto>>.Success(activities);
        }
    }

}
