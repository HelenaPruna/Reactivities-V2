using Application.Rooms.Commands;
using Application.Rooms.DTOs;
using Application.Rooms.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RoomsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<RoomDto>>> GetRoomsList( DateOnly fromDate, DateOnly toDate)
    {
        return HandleResult(await Mediator.Send(new GetRoomsList.Query
        { FromDate = fromDate, ToDate = toDate}));
    }

    [HttpGet("{activityId}")]
    public async Task<ActionResult<List<ActivityRoomDto>>> GetAvailableRooms(string activityId, bool isOneTime, string? recurId)
    {
        return HandleResult(await Mediator.Send(new GetAvailableRooms.Query
        { ActivityId = activityId, IsOneTime = isOneTime, RecurOneTimeId = recurId }));
    }

    [HttpPost("{roomId}/book/{activityId}")]
    public async Task<ActionResult> BookActivity(string activityId, string roomId, bool isOneTime, string? recurId)
    {
        return HandleResult(await Mediator.Send(new BookRoom.Command
        { ActivityId = activityId, RoomId = roomId, IsOneTime = isOneTime, RecurOneTimeId = recurId }));
    }
}
