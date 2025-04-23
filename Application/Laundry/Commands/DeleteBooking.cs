using Application.Core;
using MediatR;
using Persistence;

namespace Application.Laundry.Commands;

public class DeleteBooking
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string BookingId { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var booking = await context.LaundryBookings.FindAsync([request.BookingId], cancellationToken);
            if (booking == null) return Result<Unit>.Failure("Booking not found", 404);
            context.LaundryBookings.Remove(booking);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result
                ? Result<Unit>.Failure("Failed to delete the booking", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}
