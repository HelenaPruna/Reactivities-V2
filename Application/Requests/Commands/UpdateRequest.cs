using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Requests.Commands;

public class UpdateRequestDto
{
    public int State { get; set; }
}

public class UpdateRequest
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
        public required UpdateRequestDto Dto { get; set; }
    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var tmpReq = await context.Requests.FindAsync([request.Id], cancellationToken);
            if (tmpReq == null) return Result<Unit>.Failure("Request not found", 404);

            if (tmpReq.State == request.Dto.State) return Result<Unit>.Success(Unit.Value);

            tmpReq.State = request.Dto.State;

            if (request.Dto.State == 0)
            {
                tmpReq.ApprovedById = null;
                tmpReq.DateApproved = null;
            }
            else
            {
                var user = await userAccessor.GetUserAsync();
                tmpReq.ApprovedById = user.Id;
                tmpReq.DateApproved = DateTime.Now;
            }
            
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to update the request state", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
