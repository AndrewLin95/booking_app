using Mongo.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Mongo.Services;

public class StaffsService
{
  private readonly IMongoCollection<Staffs> _staffsCollection;

  // set the staffs collection to read from
  public StaffsService(IOptions<MongoDBSettings> staffsServices)
  {
    MongoClient client = new MongoClient(staffsServices.Value.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(staffsServices.Value.DatabaseName);
    _staffsCollection = database.GetCollection<Staffs>(staffsServices.Value.StaffsCollectionName);
  }

  // CRUD operations
  public async Task<List<Staffs>> GetAsync()
  {
    return await _staffsCollection.Find(new BsonDocument()).ToListAsync();
  }

  public async Task CreateAsync(Staffs staffs)
  {
    await _staffsCollection.InsertOneAsync(staffs);
    return;
  }

}