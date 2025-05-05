using Application.Core;
using MediatR;
using Persistence;

namespace Application.Requests.Commands;

public class DeleteRequest
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string RequestId { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var tmpReq = await context.Requests.FindAsync([request.RequestId], cancellationToken);
            if (tmpReq == null) return Result<Unit>.Failure("Request not found", 404);

            context.Requests.Remove(tmpReq);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to delete the request", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
