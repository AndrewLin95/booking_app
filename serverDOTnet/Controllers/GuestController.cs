using System;
using Microsoft.AspNetCore.Mvc;
using Mongo.Services;
using Mongo.Models;

namespace Mongo.Controllers;

[Controller]
[Route("api/[controller]")]
public class GuestController : Controller
{
  private readonly MongoDBService _mongoDBService;

  public GuestController(MongoDBService mongoDBService)
  {
    _mongoDBService = mongoDBService;
  }

  [HttpGet]
  public async Task<List<Guests>> Get()
  {
    return await _mongoDBService.GetAsync();
  }

  [HttpPost]
  public async Task<IActionResult> Post([FromBody] Guests guests)
  {
    await _mongoDBService.CreateAsync(guests);
    return CreatedAtAction(nameof(Get), new { id = guests.Id }, guests);
  }

}