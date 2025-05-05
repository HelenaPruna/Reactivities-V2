using Application.Requests.Commands;
using Application.Requests.DTOs;
using Application.Requests.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RequestsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<RequestDto>>> GetRequests(bool myRequests, bool myActReqs, int filter)
        {
            return HandleResult(await Mediator.Send(new GetRequests.Query
            { MyReqs = myRequests, MyActReqs = myActReqs, Filter = filter }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddRequest(CreateRequestDto requestDto)
        {
            return HandleResult(await Mediator.Send(new AddRequest.Command
            { RequestDto = requestDto }));
        }

        [HttpGet("activities")]
        public async Task<ActionResult<List<ActivitiesOptionsDto>>> GetActivities()
        {
            return HandleResult(await Mediator.Send(new GetActivityOptions.Query()));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateRequest(string id, [FromBody] UpdateRequestDto state)
        {
            return HandleResult(await Mediator.Send(new UpdateRequest.Command
            { Id = id, Dto = state }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOrRequester")]
        public async Task<ActionResult> DeleteRequest(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteRequest.Command
            { RequestId = id }));
        }
    }
}
