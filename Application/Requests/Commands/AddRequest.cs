using Application.Core;
using Application.Interfaces;
using Application.Requests.DTOs;
using Domain;
using MediatR;
using Persistence;

namespace Application.Requests.Commands;

public class AddRequest
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateRequestDto RequestDto { get; set; }
    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            var newRequest = new Request
            {
                Type = request.RequestDto.Type,
                Message = request.RequestDto.Message,
                RequestedById = user.Id,
                DateCreated = DateTime.Now
            };

            if (request.RequestDto.ActivityId != null)
            {
                var activity = await context.Activities.FindAsync([request.RequestDto.ActivityId], cancellationToken);
                if (activity == null) return Result<string>.Failure("Activity not found", 404);
                newRequest.ActivityId = activity.Id;
            }

            context.Requests.Add(newRequest);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<string>.Failure("Failed to add request", 400)
                : Result<string>.Success(newRequest.Id);
        }
    }
}
