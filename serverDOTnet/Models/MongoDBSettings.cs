namespace Mongo.Models;

public class MongoDBSettings
{
  public string ConnectionURI { get; set; } = null!;
  public string DatabaseName { get; set; } = null!;
  public string GuestsCollectionName { get; set; } = null!;
  public string StaffsCollectionName { get; set; } = null!;
}