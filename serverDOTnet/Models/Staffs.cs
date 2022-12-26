using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.Models;

public class Staffs
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }
  public string firstName { get; set; } = null!;
  public string lastName { get; set; } = null!;
  public string title { get; set; } = null!;
}