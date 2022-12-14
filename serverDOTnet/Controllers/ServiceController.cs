using Microsoft.AspNetCore.Mvc;
using Mongo.Models;
using Mongo.Services;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller]")]
public class servicesController : Controller
{
  private readonly ServicesAppService _servicesService;

  public servicesController(ServicesAppService servicesApp)
  {
    _servicesService = servicesApp;
  }

  [HttpGet]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<List<ServicesApp>> Get()
  {
    return await _servicesService.GetAsync();
  }

  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<IActionResult> Post([FromBody] ServicesApp services)
  {
    await _servicesService.CreateAsync(services);
    return CreatedAtAction(nameof(Get), new { id = services.Id }, services);
  }
}
