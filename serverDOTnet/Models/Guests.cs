using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Milano_API.Models
{
  public class Guests
  {
    [BsonRepresentation(BsonType.ObjectId)]
    public string email { get; set; } = null!;

    public string firstName { get; set; } = null!;
    public string lastName { get; set; } = null!;
    public string phoneNumber { get; set; } = null!;
  }

}