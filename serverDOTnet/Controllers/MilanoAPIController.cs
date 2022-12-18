using Microsoft.AspNetCore.Mvc;
using Milano_API.Models;


namespace Milano_API.Controllers
{

  [ApiController]
  public class MilanoAPIController : ControllerBase
  {
    public IEnumerable<Guests> GetGuests()
    {
      return new List<Guests> {
        new Guests {firstName="Andrew", lastName="Lin", phoneNumber="123-456-7890", email="andrew@test.com"}
      };
    }
  }
}