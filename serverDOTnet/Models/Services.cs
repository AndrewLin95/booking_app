using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.Models;

public class ServicesApp
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }
  public string serviceHeader { get; set; } = null!;
  public string serviceName { get; set; } = null!;
  public int servicePrice { get; set; }
}