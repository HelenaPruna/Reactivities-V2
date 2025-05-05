using Application.Core;
using Application.Requests.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests.Queries;

public class GetActivityOptions
{
    public class Query : IRequest<Result<List<ActivitiesOptionsDto>>>
    {

    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<ActivitiesOptionsDto>>>
    {
        public async Task<Result<List<ActivitiesOptionsDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            var activities = await context.Activities.Where(x => !x.IsCancelled).Include(x => x.Recurrences)
                .Where(x => x.Recurrences.Any(r => r.Date >= today))
                .ProjectTo<ActivitiesOptionsDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<ActivitiesOptionsDto>>.Success(activities);
        }
    }
}
