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
            var today = DateTime.UtcNow;

            var query = request.Filter switch
            {
                "creatorPast" => context.Activities.Where(x => x.CreatorId == request.UserId && x.Date < today),
                "creator" => context.Activities.Where(x => x.CreatorId == request.UserId && x.Date >= today),
                "organizingPast" => context.ActivityOrganizers.Where(u => u.User.Id == request.UserId && u.Activity.Date < today).Select(x => x.Activity),
                _ => context.ActivityOrganizers.Where(u => u.User.Id == request.UserId && u.Activity.Date >= today).Select(x => x.Activity)
            };

            var projectedActivities = query.OrderBy(x => x.Date).ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);

            var activities = await projectedActivities.ToListAsync(cancellationToken);

            return Result<List<UserActivityDto>>.Success(activities);
        }
    }

}
