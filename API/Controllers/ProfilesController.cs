using System;
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

    
}
