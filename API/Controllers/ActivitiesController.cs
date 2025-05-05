using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Attendances.Commands;
using Application.Attendances.DTOs;
using Application.Attendances.Queries;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDto>>> GetActivities([FromQuery] ActivityParams activityParams)
    {
        return HandleResult(await Mediator.Send(new GetActivityList.Query { Params = activityParams }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDetailsDto>> GetActivityDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> EditActivity(string id, EditActivityDto activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    }

    [HttpPut("{id}/cancel")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ToggleCancelActivity(string id)
    {
        return HandleResult(await Mediator.Send(new CancelActivity.Command { Id = id }));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }

    [HttpPost("{id}/organizers")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateOrganizers(string id, string[] profilesIds)
    {
        return HandleResult(await Mediator.Send(new UpdateOrganizer.Command
        { ActivityId = id, ProfilesIds = profilesIds }));
    }

    [HttpPost("{id}/recurrence")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<string>> AddOneTimeRecurrence(string id, CreateRecurrenceDto recurrenceDto)
    {
        return HandleResult(await Mediator.Send(new AddRecurrence.Command
        { ActivityId = id, RecurrenceDto = recurrenceDto }));
    }

    [HttpDelete("{id}/recurrence/{recurId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteRecurrence(string id, string recurId)
    {
        return HandleResult(await Mediator.Send(new DeleteRecurrence.Command
        { ActivityId = id, RecurrenceId = recurId }));
    }

    #region Attendees

    [HttpGet("{id}/attendees")]
    public async Task<ActionResult<List<AttendeeDto>>> GetAttendees(string id, bool predicate)
    {
        return HandleResult(await Mediator.Send(new GetAttendeesList.Query
        { Id = id, IsWaiting = predicate }));
    }

    [HttpPost("{id}/attendees")]
    public async Task<ActionResult<string>> CreateAttendee(string id, CreateAttendeeDto createAttendeeDto)
    {
        return HandleResult(await Mediator.Send(new CreateAttendee.Command
        { ActivityId = id, CreateAttendeeDto = createAttendeeDto }));
    }

    [HttpPut("{id}/attendees/{attendeeId}")]
    [Authorize(Policy = "AdminOrOrganizer")]
    public async Task<ActionResult> ActivateAttendee(string id, string attendeeId)
    {
        return HandleResult(await Mediator.Send(new ActivateAttendee.Command
        { ActivityId = id, AttendeeId = attendeeId }));
    }

    [HttpDelete("{id}/attendees/{attendeeId}")]
    [Authorize(Policy = "AdminOrOrganizer")]
    public async Task<ActionResult> DeleteAttendee(string id, string attendeeId)
    {
        return HandleResult(await Mediator.Send(new DeleteAttendee.Command
        { ActivityId = id, AttendeeId = attendeeId }));
    }

    [HttpGet("{id}/attendance/{recurrenceId}")]
    public async Task<ActionResult<List<Attendance>>> GetAttendance(string id, string recurrenceId)
    {
        return HandleResult(await Mediator.Send(new GetAttendeesAttendance.Query
        { Id = id, RecurrenceId = recurrenceId }));
    }

    [HttpPut("{id}/attendance/{recurrenceId}")]
    [Authorize(Policy = "AdminOrOrganizer")]
    public async Task<ActionResult> UpdateAttendance(string id, string recurrenceId, AttendanceDto[] attendanceValues)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command
        { ActivityId = id, RecurrenceId = recurrenceId, AttendanceValues = attendanceValues }));
    }
    #endregion Attendees
}