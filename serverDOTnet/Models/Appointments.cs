using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.Models;

public class Appointments
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? id { get; set; }
  [BsonRequired]
  public string guestName { get; set; } = null!;
  [BsonRequired]
  public string staffName { get; set; } = null!;
  [BsonRequired]
  public int startTime { get; set; }
  [BsonRequired]
  public int endTime { get; set; }
  [BsonRequired]
  public int duration { get; set; }
  [BsonRequired]
  public string serviceHeader { get; set; } = null!;
  [BsonRequired]
  public string date { get; set; } = null!;
  [BsonRequired]
  public bool isComplete { get; set; }
  [BsonRequired]
  public bool isCancelled { get; set; }
}