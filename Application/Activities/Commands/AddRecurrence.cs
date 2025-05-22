using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class AddRecurrence
{
    public class Command : IRequest<Result<string>>
    {
        public required string ActivityId { get; set; }
        public required CreateRecurrenceDto RecurrenceDto { get; set; }
    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.ActivityId], cancellationToken);
            if (activity == null) return Result<string>.Failure("Activity not found", 404);

            var recur = new RecurrenceActivity
            {
                Date = request.RecurrenceDto.Date,
                TimeStart = request.RecurrenceDto.TimeStart,
                TimeEnd = request.RecurrenceDto.TimeEnd,
                IsRecurrent = false
            };
            activity.Recurrences.Add(recur);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("Failed to add recurrence", 400);

            var isAdmin = userAccessor.IsUserAdmin();
            var userId = userAccessor.GetUserId();
            if (!isAdmin)
            {

                var dateFormatted = recur.Date.Day + "-" + recur.Date.Month + "-" + recur.Date.Year;
                var roomRequest = new Request
                {
                    Type = 2,
                    RequestedById = userId,
                    Message = "S'ha de reservar una sala per a l'activitat puntual del dia " + dateFormatted,
                    DateCreated = DateTime.Now,
                    ActivityId = request.ActivityId
                };
                activity.Requests.Add(roomRequest);

                var resultBooking = await context.SaveChangesAsync(cancellationToken) > 0;
                if (!resultBooking) return Result<string>.Failure("Failed to add request", 400);
            }

            return Result<string>.Success(recur.Id);
        }
    }
}
