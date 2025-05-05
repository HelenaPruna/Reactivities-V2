using Application.Core;
using Application.Interfaces;
using Application.Requests.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests.Queries;

public class GetRequests
{
    public class Query : IRequest<Result<List<RequestDto>>>
    {
        public bool MyReqs { get; set; } = false;
        public bool MyActReqs { get; set; } = false;
        public int Filter { get; set; } = 0;
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) :
    IRequestHandler<Query, Result<List<RequestDto>>>
    {
        public async Task<Result<List<RequestDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dashboardRequests = context.Requests.Where(r => r.State == request.Filter);

            if (request.MyReqs || request.MyActReqs)
            {
                var user = await userAccessor.GetUserAsync();
                dashboardRequests = dashboardRequests.Include(x => x.Activity)
                    .Where(r => (request.MyReqs && r.RequestedById == user.Id)
                    || (request.MyActReqs && r.Activity.Organizers.Any(o => o.UserId == user.Id)));
            }

            var listRequests = await dashboardRequests.OrderByDescending(r => r.DateCreated)
                .ProjectTo<RequestDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<RequestDto>>.Success(listRequests);
        }
    }
}
