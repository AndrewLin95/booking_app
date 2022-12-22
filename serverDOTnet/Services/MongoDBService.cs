using Mongo.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Mongo.Services;

public class MongoDBService
{
  private readonly IMongoCollection<Guests> _guestCollection;

  public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
  {
    MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
    _guestCollection = database.GetCollection<Guests>(mongoDBSettings.Value.CollectionName);
  }

  public async Task CreateAsync(Guests guests)
  {
    await _guestCollection.InsertOneAsync(guests);
    return;
  }

  public async Task<List<Guests>> GetAsync()
  {
    return await _guestCollection.Find(new BsonDocument()).ToListAsync();
  }
}