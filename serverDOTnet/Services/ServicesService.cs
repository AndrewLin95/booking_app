using Mongo.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Mongo.Services;

public class ServicesAppService
{
  private readonly IMongoCollection<ServicesApp> _servicesCollection;

  public ServicesAppService(IOptions<MongoDBSettings> servicesService)
  {
    MongoClient client = new MongoClient(servicesService.Value.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(servicesService.Value.DatabaseName);
    _servicesCollection = database.GetCollection<ServicesApp>(servicesService.Value.ServicesCollectionName);
  }

  public async Task<List<ServicesApp>> GetAsync()
  {
    return await _servicesCollection.Find(new BsonDocument()).ToListAsync();
  }

  public async Task CreateAsync(ServicesApp services)
  {
    await _servicesCollection.InsertOneAsync(services);
    return;
  }

}