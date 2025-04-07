using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<UserProfile>>> GetProfilesList()
    {
        return await Mediator.Send(new GetProfilesList.Query());
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
    }

    [HttpGet("{userId}/activities")]
    public async Task<ActionResult<UserActivityDto>> GetUserActivities(string userId, string filter)
    {
        return HandleResult(await Mediator.Send(new GetUserActivities.Query { UserId = userId, Filter = filter }));
    }

}
