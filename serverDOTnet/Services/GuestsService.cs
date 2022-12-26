using Mongo.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Mongo.Services;

public class GuestsService
{
  private readonly IMongoCollection<Guests> _guestCollection;

  // Sets the correct collection for this Service to pull data from
  public GuestsService(IOptions<MongoDBSettings> guestsService)
  {
    MongoClient client = new MongoClient(guestsService.Value.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(guestsService.Value.DatabaseName);
    _guestCollection = database.GetCollection<Guests>(guestsService.Value.CollectionName);
  }

  // CRUD operations on Guest Services
  public async Task<List<Guests>> GetAsync()
  {
    return await _guestCollection.Find(new BsonDocument()).ToListAsync();
  }

  public async Task CreateAsync(Guests guests)
  {
    await _guestCollection.InsertOneAsync(guests);
    return;
  }
}