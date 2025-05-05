using API.DTOs;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName
        };

        var userResult = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
        if (!userResult.Succeeded)
        {
            foreach (var error in userResult.Errors)
                ModelState.AddModelError(error.Code, error.Description);

            return ValidationProblem(ModelState);
        }

        var roleResult = await signInManager.UserManager.AddToRoleAsync(user, registerDto.Role);
        if (roleResult.Succeeded) return Ok();

        await signInManager.UserManager.DeleteAsync(user);

        foreach (var error in roleResult.Errors)
            ModelState.AddModelError(error.Code, error.Description);

        return ValidationProblem(ModelState);
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();

        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        var roles = await signInManager.UserManager.GetRolesAsync(user);
        var role = roles.SingleOrDefault()
           ?? throw new InvalidOperationException("User has no role assigned.");

        return Ok(new
        {
            user.DisplayName,
            user.Email,
            user.Id,
            Role = role
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    [HttpGet("users")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        return HandleResult(await Mediator.Send(new GetUsers.Query()));
    }

    [HttpDelete("users/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteUser(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteUser.Command { Id = id }));
    }
}
