using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.Models;

public class Appointments
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? id { get; set; }
  public string guestName { get; set; } = null!;
  public string staffName { get; set; } = null!;
  public int startTime { get; set; }
  public int endTime { get; set; }
  public int duration { get; set; }
  public string serviceHeader { get; set; } = null!;
  public string date { get; set; } = null!;
  public bool isComplete { get; set; }
  public bool isCancelled { get; set; }
}