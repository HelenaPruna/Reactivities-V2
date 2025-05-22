using Application.Laundry.Commands;
using Application.Laundry.DTOs;
using Application.Laundry.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LaundryController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<LaundryBooking>>> GetLaundryBookings(DateTime startDate)
    {
        return HandleResult(await Mediator.Send(new GetBookings.Query
        { StartDate = startDate }));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> BookingLaundry(BookingDto bookingDto)
    {
        return HandleResult(await Mediator.Send(new CreateBooking.Command
        { BookingDto = bookingDto }));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> EditBooking(string id, EditBookingDto bookingDto)
    {
        bookingDto.Id = id;
        return HandleResult(await Mediator.Send(new EditBooking.Command
        { BookingDto = bookingDto }));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteBooking(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteBooking.Command
        { BookingId = id }));
    }
}
