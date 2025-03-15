using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetActivities([FromQuery] ActivityParams activityParams)
    {
        return HandleResult(await Mediator.Send(new GetActivityList.Query { Params = activityParams }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivityDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityCreator")]
    public async Task<ActionResult> EditActivity(string id, EditActivityDto activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityCreator")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }

    [HttpPost("{id}/organizers")]
    public async Task<ActionResult> UpdateOrganizers(string id, string[] profilesIds)
    {
        return HandleResult(await Mediator.Send(new UpdateOrganizer.Command
        { ActivityId = id, ProfilesIds = profilesIds }));
    }

    [HttpGet("{id}/attendees")]
    public async Task<ActionResult<List<AttendeeDto>>> GetAttendees(string id, bool predicate)
    {
        return HandleResult(await Mediator.Send(new GetAttendeesList.Query
        { Id = id, IsWaiting = predicate }));
    }

    [HttpPost("{id}/attendees")]
    public async Task<ActionResult> CreateAttendee(string id, CreateAttendeeDto createAttendeeDto)
    {
        return HandleResult(await Mediator.Send(new CreateAttendee.Command
        { ActivityId = id, CreateAttendeeDto = createAttendeeDto }));
    }

    [HttpDelete("{id}/attendees/{attendeeId}")]
    public async Task<ActionResult> DeleteAttendee(string id, string attendeeId)
    {
        var _ = id;
        return HandleResult(await Mediator.Send(new DeleteAttendee.Command
        { ActivityId = id,  AttendeeId = attendeeId }));
    }

    [HttpGet("{id}/attendance")]
    public async Task<ActionResult<List<AttendeeAttendanceDto>>> GetAttendance(string id, DateOnly predicate)
    {
        return HandleResult(await Mediator.Send(new GetAttendeesAttendance.Query
        { Id = id, Date = predicate }));
    }

    [HttpPost("{id}/attendance")]
    public async Task<ActionResult> UpdateAttendance(string id, DateOnly predicate, AttendanceDto[] attendanceValues)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command
        { ActivityId = id, Date = predicate, AttendanceValues = attendanceValues }));
    }

}