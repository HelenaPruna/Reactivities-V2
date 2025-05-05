using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<PagedList<ActivityDto>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
    {
        public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var userId = userAccessor.GetUserId();
            var startDate = request.Params.StartDate;
            string? lastId = request.Params.Cursor;

            var baseQuery = context.Activities.Include(x => x.Recurrences)
                .Where(a => a.Recurrences.Any(r => r.Date >= startDate))
                .OrderBy(a => a.Id).AsQueryable();

            if (!request.Params.IncludeCancelled) baseQuery = baseQuery.Where(x => !x.IsCancelled);

            baseQuery = baseQuery.Include(x => x.Organizers);
            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                baseQuery = request.Params.Filter switch
                {
                    "isOrganizing" => baseQuery.Where(a => a.Organizers.Any(o => o.UserId == userId)),
                    "isCreator" => baseQuery.Where(a => a.CreatorId == userId),
                    _ => baseQuery
                };
            }

            if (!string.IsNullOrWhiteSpace(request.Params.SearchTerm))
            {
                var term = request.Params.SearchTerm.Trim().ToLower();
                baseQuery = baseQuery.Where(a => a.Title.ToLower().Contains(term));
            }

            var inMemory = await baseQuery.Include(x => x.Creator).Include(x => x.Attendees).ToListAsync(cancellationToken);

            var paged = inMemory
                .Where(a => lastId == null || string.CompareOrdinal(a.Id, lastId) >= 0)
                .Take(request.Params.PageSize + 1).ToList();

            var pageSizePlusOne = request.Params.PageSize + 1;
            var dtos = paged
                .Select(a => mapper.Map<ActivityDto>(a, opts => opts.Items["CurrentUserId"] = userId))
                .ToList();

            string? nextCursor = null;
            if (dtos.Count > request.Params.PageSize)
            {
                nextCursor = dtos[request.Params.PageSize].Id;
                dtos.RemoveAt(request.Params.PageSize);
            }

            dtos = [.. dtos.OrderBy(x => x.DateStart).ThenBy(x => x.DateEnd)];

            return Result<PagedList<ActivityDto>>.Success(new PagedList<ActivityDto>
            {
                Items = dtos,
                NextCursor = nextCursor
            });
        }
    }
}
