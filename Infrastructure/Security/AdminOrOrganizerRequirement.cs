using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class AdminOrOrganizerRequirement : IAuthorizationRequirement
{

}

public class AdminOrOrganizerHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    : AuthorizationHandler<AdminOrOrganizerRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminOrOrganizerRequirement requirement)
    {
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return;
        }

        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext?.GetRouteValue("id") is not string activityId) return;

        var isOrganizer = await dbContext.ActivityOrganizers
            .AsNoTracking().AnyAsync(x => x.ActivityId == activityId && x.UserId == userId);

        if (isOrganizer) context.Succeed(requirement);
    }
}
