using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class AdminOrRequesterRequirement : IAuthorizationRequirement
{

}

public class AdminOrRequesterHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
: AuthorizationHandler<AdminOrRequesterRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminOrRequesterRequirement requirement)
    {
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return;
        }

        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext?.GetRouteValue("id") is not string reqId) return;

        var isRequester = await dbContext.Requests
            .AsNoTracking().AnyAsync(x => x.Id == reqId && x.RequestedById == userId);

        if (isRequester) context.Succeed(requirement);
    }
}
