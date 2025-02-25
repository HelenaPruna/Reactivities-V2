using System;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilesList
{
    public class Query : IRequest<List<UserProfile>> { }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<UserProfile>>
    {
        public async Task<List<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Users.ProjectTo<UserProfile>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
        }
    }
}
