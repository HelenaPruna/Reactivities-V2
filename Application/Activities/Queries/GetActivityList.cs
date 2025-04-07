using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<PagedList<ActivityDto, DateOnly?>>>
    {
        public required ActivityParams Params { get; set; }

    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PagedList<ActivityDto, DateOnly?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateOnly?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            //TODO: revisar pagination pk si tinc moltes activitats que comencen pel mateix dia la paginació llavors les torna agafar
            var query = context.Activities.Include(x => x.FirstDate).OrderBy(x => x.FirstDate.Date)
                .Where(x => x.FirstDate.Date >= (request.Params.Cursor ?? request.Params.StartDate)).AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isOrganizing" => query.Where(x => x.Organizers.Any(a => a.UserId == userAccessor.GetUserId())),
                    "isCreator" => query.Where(x => x.CreatorId == userAccessor.GetUserId()),
                    _ => query
                };
            }
            var projectedActivities = query.ProjectTo<ActivityDto>(mapper.ConfigurationProvider);


            var activities = await projectedActivities.Take(request.Params.PageSize + 1).ToListAsync(cancellationToken);

            DateOnly? nextCursor = null;
            if (activities.Count > request.Params.PageSize)
            {
                nextCursor = activities.Last().DateStart;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PagedList<ActivityDto, DateOnly?>>.Success(
                new PagedList<ActivityDto, DateOnly?>
                {
                    Items = activities,
                    NextCursor = nextCursor
                }
            );
        }
    }
}
