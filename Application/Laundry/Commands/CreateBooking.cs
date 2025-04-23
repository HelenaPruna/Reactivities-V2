using Application.Core;
using Application.Laundry.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Laundry.Commands;

public class CreateBooking
{
    public class Command : IRequest<Result<Unit>>
    {
        public required BookingDto BookingDto { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var bookingDto = request.BookingDto;
            var ocur = bookingDto.IsRecurrent ? 10 : 1;
            List<LaundryBooking> tmpBookings = [];

            for (int i = 0; i < ocur; i++)
            {
                var start = bookingDto.Start.AddDays(7 * i);
                var end = start.Add(TimeSpan.FromMinutes(90));

                bool conflict = await context.LaundryBookings
                    .AnyAsync(b => b.Start < end && start < b.End, cancellationToken);
                //?: nss si això ho voldran així que es puguin crear reserves fins que hi hagi un error de conflicte 
                if (conflict) return Result<Unit>.Failure($"Hi ha un conflicte d'horaris per la data: {start:yyyy-MM-dd HH:mm}", 400);

                tmpBookings.Add(new LaundryBooking { Name = bookingDto.Name, Start = start, End = end });
            }
            context.LaundryBookings.AddRange(tmpBookings);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Hi hagut un problema fent la reserva", 400);
        }
    }
}
