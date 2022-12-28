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
  public async Task<List<Appointments>> Get()
  {
    return await _appointmentsService.GetAllAsync();
  }

  [HttpPost]
  public async Task<IActionResult> Post([FromBody] Appointments appointments)
  {
    await _appointmentsService.CreateAsync(appointments);
    return CreatedAtAction(nameof(Get), new { Id = appointments.id }, appointments);
  }

}