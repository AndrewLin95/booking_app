using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.Models;

public class ServicesApp
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }
  [BsonRequired]
  public string serviceHeader { get; set; } = null!;
  [BsonRequired]
  public string serviceName { get; set; } = null!;
  [BsonRequired]
  public int servicePrice { get; set; }
}