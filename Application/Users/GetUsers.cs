using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users;

public class GetUsers
{
    public class Query : IRequest<Result<List<UserDto>>>
    {
        public string? SearchTerm { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<UserDto>>>
    {
        public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var users = context.Users.AsQueryable();
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var term = request.SearchTerm.Trim().ToLower();
                users = users.Where(a => a.DisplayName!.ToLower().StartsWith(term));
            }

            var userList = await users.Select(u => new UserDto
            {
                Id = u.Id,
                DisplayName = u.DisplayName ?? u.UserName!,
                Email = u.Email!,
                Role = (from ur in context.UserRoles
                        join r in context.Roles
                        on ur.RoleId equals r.Id
                        where ur.UserId == u.Id
                        select r.Name)
                .FirstOrDefault() ?? "NoRole"
            }).ToListAsync(cancellationToken);

            return Result<List<UserDto>>.Success(userList);
        }
    }
}
