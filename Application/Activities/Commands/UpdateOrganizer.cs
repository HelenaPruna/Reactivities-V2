using System;
using Application.Core;
using Application.Profiles.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateOrganizer
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }

        public required ICollection<string> ProfilesIds { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(a => a.Organizers).ThenInclude(u => u.User)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            var currentOrganizers = activity.Organizers.ToList();
            var currentOrganizerIds = currentOrganizers.Select(aa => aa.User.Id).ToHashSet();
            var newOrganizerIds = request.ProfilesIds.ToHashSet();

            var organizersToRemove = currentOrganizers.Where(aa => !newOrganizerIds.Contains(aa.User.Id)).ToList();
            foreach (var organizer in organizersToRemove) activity.Organizers.Remove(organizer);

            var idsToAdd = newOrganizerIds.Except(currentOrganizerIds).ToList();
            var usersToAdd = await context.Users.Where(u => idsToAdd.Contains(u.Id)).ToListAsync(cancellationToken);
            foreach (var user in usersToAdd)
            {
                var organizer = new ActivityOrganizer
                {
                    User = user,
                    Activity = activity
                };
                activity.Organizers.Add(organizer);
            }
            

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<Unit>.Failure("Failed to update organizers", 400) : Result<Unit>.Success(Unit.Value);
        }
    }
}
