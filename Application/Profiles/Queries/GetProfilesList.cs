using System;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilesList
{
    public class Query : IRequest<List<UserProfile>> { }
    public class Handler(AppDbContext context, IMapper mapper, RoleManager<IdentityRole> roleManager) : IRequestHandler<Query, List<UserProfile>>
    {
        public async Task<List<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var observerRole = await roleManager.FindByNameAsync("Observer");
            if (observerRole == null)
            {
                return await context.Users.ProjectTo<UserProfile>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            }
            var observerRoleId = observerRole.Id;

            return await context.Users.Where(u => !context.UserRoles
                .Any(ur => ur.UserId == u.Id && ur.RoleId == observerRoleId))
                .ProjectTo<UserProfile>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
