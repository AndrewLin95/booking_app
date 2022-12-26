using System;
using Microsoft.AspNetCore.Mvc;
using Mongo.Services;
using Mongo.Models;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller]")]
public class GuestController : Controller
{
  private readonly GuestsService _guestService;

  public GuestController(GuestsService guestsService)
  {
    _guestService = guestsService;
  }

  [HttpGet]
  public async Task<List<Guests>> Get()
  {
    return await _guestService.GetAsync();
  }

  [HttpPost]
  public async Task<IActionResult> Post([FromBody] Guests guests)
  {
    await _guestService.CreateAsync(guests);
    return CreatedAtAction(nameof(Get), new { id = guests.Id }, guests);
  }
}