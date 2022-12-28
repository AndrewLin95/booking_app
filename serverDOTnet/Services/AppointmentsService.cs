using MongoDB.Driver;
using MongoDB.Bson;
using Mongo.Models;
using Microsoft.Extensions.Options;

namespace Mongo.Services;

public class AppointmentsService
{
  private readonly IMongoCollection<Appointments> _appointmentsCollection;

  public AppointmentsService(IOptions<MongoDBSettings> appointmentsService)
  {
    MongoClient client = new MongoClient(appointmentsService.Value.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(appointmentsService.Value.DatabaseName);
    _appointmentsCollection = database.GetCollection<Appointments>(appointmentsService.Value.AppointmentsCollectionName);
  }

  public async Task<List<Appointments>> GetAllAsync()
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.isComplete, false) & builder.Eq(appointments => appointments.isCancelled, false);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  public async Task CreateAsync(Appointments appointments)
  {
    await _appointmentsCollection.InsertOneAsync(appointments);
    return;
  }

}