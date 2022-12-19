using Microsoft.AspNetCore.Mvc;
using Milano_API.Models;
using Milano_API.Services;


namespace Milano_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class MilanoAPIController : Controller
  {
    private readonly MongoDBService _mongoDBService;

    public MilanoAPIController(MongoDBService mongoDBService) =>
      _mongoDBService = mongoDBService;

    [HttpGet]
    public async Task<List<Guests>> Get()
    {
      return await _mongoDBService.GetAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Guests guest)
    {
      await _mongoDBService.CreateAsync(guest);
      return CreatedAtAction(nameof(Get), new { guest });
    }

    // public IEnumerable<Guests> GetGuests()
    // {
    //   return new List<Guests> {
    //     new Guests {firstName="Andrew", lastName="Lin", phoneNumber="123-456-7890", email="andrew@test.com"}
    //   };
    // }
  }
}