using System;
using Microsoft.AspNetCore.Mvc;
using Mongo.Services;
using Mongo.Models;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller]")]
public class guestsController : Controller
{
  // Dependency Injection for Guests Services into this controller. _guestServices is called to access the service
  private readonly GuestsService _guestService;

  public guestsController(GuestsService guestsService)
  {
    _guestService = guestsService;
  }

  [HttpGet]
  public async Task<List<Guests>> Get()
  {
    return await _guestService.GetAsync();
  }

  // [FromBody] takes the value from the body
  [HttpPost]
  public async Task<IActionResult> Post([FromBody] Guests guests)
  {
    // creating a new guest record using the GuestController method. Pases `guests` as a parameter
    await _guestService.CreateAsync(guests);
    // CreatedAtAction repressents a 201 response and location of the resource.
    // The location is specified using nameof(Get) which is the route to the get above.
    // The id is passed which passes the details back as part of the response
    return CreatedAtAction(nameof(Get), new { id = guests.Id }, guests);
  }
}