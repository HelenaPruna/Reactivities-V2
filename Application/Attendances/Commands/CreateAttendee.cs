using Application.Attendances.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Commands;

public class CreateAttendee
{
    public class Command : IRequest<Result<string>>
    {
        public required string ActivityId { get; set; }
        public required CreateAttendeeDto CreateAttendeeDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(x => x.Attendees)
            .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
            if (activity == null) return Result<string>.Failure("Activity not found", 404);
            var capacity = activity.Attendees.Where(x => x.IsWaiting == false).Count();

            var attendee = mapper.Map<Attendee>(request.CreateAttendeeDto);
            attendee.ActivityId = request.ActivityId;
            context.Attendees.Add(attendee);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<string>.Failure("Failed to create the attendee", 400)
                : Result<string>.Success(attendee.Id);

        }
    }
}
