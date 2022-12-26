using Microsoft.AspNetCore.Mvc;
using Mongo.Models;
using Mongo.Services;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller")]
public class ServicesController : Controller
{
  private readonly ServicesAppService _servicesService;

  public ServicesController(ServicesAppService servicesApp)
  {
    _servicesService = servicesApp;
  }

  [HttpGet]
  public async Task<List<ServicesApp>> Get()
  {
    return await _servicesService.GetAsync();
  }

  [HttpPost]
  public async Task<IActionResult> Post([FromBody] ServicesApp services)
  {
    await _servicesService.CreateAsync(services);
    return CreatedAtAction(nameof(Get), new { id = services.Id }, services);
  }
}
