using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class CreateAttendee
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ActivityId { get; set; }
        public required CreateAttendeeDto CreateAttendeeDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(x => x.Attendees)
            .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            var capacity = activity.Attendees.Where(x => x.IsWaiting == false).Count();
            var IsWaiting = false;
            if (capacity >= activity.MaxParticipants) IsWaiting = true;

            var attendee = mapper.Map<Attendee>(request.CreateAttendeeDto);
            attendee.ActivityId = request.ActivityId;
            attendee.IsWaiting = IsWaiting;
            context.Attendees.Add(attendee);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to create the attendee", 400)
                : Result<Unit>.Success(Unit.Value);

        }
    }
}
