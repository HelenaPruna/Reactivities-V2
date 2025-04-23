using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Laundry.Queries;

public class GetBookings
{
    public class Query : IRequest<Result<List<LaundryBooking>>>
    {
        public DateTime StartDate { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<LaundryBooking>>>
    {
        public async Task<Result<List<LaundryBooking>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var startDate = request.StartDate;
            var weekEnd = startDate.AddDays(5);

            var bookings = await context.LaundryBookings
                .Where(b => b.Start >= startDate && b.Start < weekEnd)
                .OrderBy(b => b.Start).ToListAsync(cancellationToken);

            return Result<List<LaundryBooking>>.Success(bookings);
        }
    }
}
