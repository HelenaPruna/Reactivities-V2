using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsCreatorRequirement : IAuthorizationRequirement
{

}

public class IsCreatorRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    : AuthorizationHandler<IsCreatorRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCreatorRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext?.GetRouteValue("id") is not string activityId) return;

        var creator = await dbContext.Activities.AsNoTracking() //not really needed the no tracking?? just in case
            .FirstOrDefaultAsync(x => x.Id == activityId && x.Creator.Id == userId);
        if (creator == null) return;

        context.Succeed(requirement);
     }
}
