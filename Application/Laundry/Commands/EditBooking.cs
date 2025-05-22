using Application.Core;
using Application.Laundry.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Laundry.Commands;

public class EditBooking
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditBookingDto BookingDto { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var dto = request.BookingDto;
            var laundryBooking = await context.LaundryBookings.FirstOrDefaultAsync(x => x.Id == dto.Id, cancellationToken);
            if (laundryBooking == null) return Result<Unit>.Failure("laundry booking not found", 404);

            var start = dto.Start;
            var end = start.Add(TimeSpan.FromMinutes(90));
            bool conflict = await context.LaundryBookings
                    .AnyAsync(b => b.Start < end && start < b.End, cancellationToken);
            if (conflict) return Result<Unit>.Failure($"Hi ha un conflicte d'horaris per la data: {start:yyyy-MM-dd HH:mm}", 400);

            laundryBooking.End = end;
            mapper.Map(dto, laundryBooking);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value) 
                : Result<Unit>.Failure("Failed to update the laundry booking", 400);

        }
    }
}
