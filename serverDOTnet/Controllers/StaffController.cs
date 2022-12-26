using Microsoft.AspNetCore.Mvc;
using Mongo.Services;
using Mongo.Models;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller]")]
public class staffsController : Controller
{
  // Dependency injection of Staff Services into controller. Pulls logic from the staff services into here.
  private readonly StaffsService _staffsService;

  public staffsController(StaffsService staffsService)
  {
    _staffsService = staffsService;
  }

  [HttpGet]
  public async Task<List<Staffs>> Get()
  {
    return await _staffsService.GetAsync();
  }

  [HttpPost]
  public async Task<IActionResult> Post([FromBody] Staffs staffs)
  {
    await _staffsService.CreateAsync(staffs);
    return CreatedAtAction(nameof(Get), new { id = staffs.Id }, staffs);
  }
}
