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

  // Get all appointments that are not completed or cancelled
  public async Task<List<Appointments>> GetAllAsync()
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.isComplete, false) & builder.Eq(appointments => appointments.isCancelled, false);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  // Get all appointments that are completed
  public async Task<List<Appointments>> GetCompletedAsync()
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.isComplete, true) & builder.Eq(appointments => appointments.isCancelled, false);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  // Get all appointments that are cancelled
  public async Task<List<Appointments>> GetCancelledAsync()
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.isComplete, false) & builder.Eq(appointments => appointments.isCancelled, true);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  public async Task CreateAsync(Appointments appointments)
  {
    await _appointmentsCollection.InsertOneAsync(appointments);
    return;
  }

}