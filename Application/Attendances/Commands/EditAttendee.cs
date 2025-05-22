using Application.Attendances.DTOs;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendances.Commands;

public class EditAttendee
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string AttendeeId { get; set; }
        public required CreateAttendeeDto CreateAttendeeDto { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var dto = request.CreateAttendeeDto;
            var attendee = await context.Attendees.FirstOrDefaultAsync(x => x.Id == request.AttendeeId, cancellationToken);
            if (attendee == null) return Result<Unit>.Failure("attendee not found", 404);
            attendee.Identifier = dto.Identifier;
            attendee.Comments = dto.Comments;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to update the attendee", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
