using Milano_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Milano_API.Services;

public class MongoDBService
{
  private readonly IMongoCollection<Guests> _guestsCollection;

  public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
  {
    MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
    IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
    _guestsCollection = database.GetCollection<Guests>(mongoDBSettings.Value.CollectionName);
  }

  public async Task<List<Guests>> GetAsync()
  {
    return await _guestsCollection.Find(_ => true).ToListAsync();
  }

  public async Task CreateAsync(Guests guests)
  {
    await _guestsCollection.InsertOneAsync(guests);
    return;
  }

}