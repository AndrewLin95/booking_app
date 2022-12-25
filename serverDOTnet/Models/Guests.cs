using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Mongo.Models;

public class Guests
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string Id { get; set; } = null!;

  public string firstName { get; set; } = null!;
  public string lastName { get; set; } = null!;
  public string phoneNumber { get; set; } = null!;
  public string email { get; set; } = null!;
}