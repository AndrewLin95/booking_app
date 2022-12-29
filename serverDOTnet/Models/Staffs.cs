using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.Models;

public class Staffs
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }
  [BsonRequired]
  public string firstName { get; set; } = null!;
  [BsonRequired]
  public string lastName { get; set; } = null!;
  [BsonRequired]
  public string title { get; set; } = null!;
}