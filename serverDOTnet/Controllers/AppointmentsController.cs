using Microsoft.AspNetCore.Mvc;
using Mongo.Models;
using Mongo.Services;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller]")]
public class appointmentsController : Controller
{
  private readonly AppointmentsService _appointmentsService;

  public appointmentsController(AppointmentsService appointmentsService)
  {
    _appointmentsService = appointmentsService;
  }

  [HttpGet]
  [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Appointments))]
  public async Task<List<Appointments>> Get()
  {
    return await _appointmentsService.GetAllAsync();
  }

  [HttpGet("complete")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<List<Appointments>> GetComplete()
  {
    return await _appointmentsService.GetCompletedAsync();
  }

  [HttpGet("cancel")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<List<Appointments>> GetCancelled()
  {
    return await _appointmentsService.GetCancelledAsync();
  }

  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<IActionResult> Post([FromBody] Appointments appointments)
  {
    var result = await _appointmentsService.CreateAsync(appointments);
    if (result == "duplicate")
    {
      return BadRequest();
    }

    return CreatedAtAction(nameof(Get), new { Id = appointments.id }, appointments);
  }
}