using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users;

public class DeleteUser
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (user == null) return Result<Unit>.Failure("User not found", 404);

            var oneYearAgo = DateOnly.FromDateTime(DateTime.Now.AddYears(-1));
            var hasRecent = await context.Recurrences
                .Where(r => r.Activity.CreatorId == request.Id)
                .AnyAsync(r => r.Date >= oneYearAgo, cancellationToken);
            if (hasRecent)
                return Result<Unit>.Failure("Aquest usuari té tallers creats recents, no es pot eliminar", 400);

            var actOrganizer = context.ActivityOrganizers.Where(x => x.UserId == user.Id);
            if (actOrganizer != null)
            {
                context.ActivityOrganizers.RemoveRange(actOrganizer);
                await context.SaveChangesAsync(cancellationToken);
            }
            var userRequests = context.Requests.Where(x => x.RequestedById == user.Id);
            if (userRequests != null)
            {
                context.Requests.RemoveRange(userRequests);
                await context.SaveChangesAsync(cancellationToken);
            }


            context.Remove(user);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to delete the user", 400) 
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
