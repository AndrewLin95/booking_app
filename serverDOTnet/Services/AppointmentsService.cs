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
    var filter = builder.Eq(appointments => appointments.isComplete, false) &
      builder.Eq(appointments => appointments.isCancelled, false);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  // Get all appointments that are completed
  public async Task<List<Appointments>> GetCompletedAsync()
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.isComplete, true) &
      builder.Eq(appointments => appointments.isCancelled, false);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  // Get all appointments that are cancelled
  public async Task<List<Appointments>> GetCancelledAsync()
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.isComplete, false) &
      builder.Eq(appointments => appointments.isCancelled, true);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  // Get all appointments on a specific date
  public async Task<List<Appointments>> GetDatesAsync(string date)
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(appointments => appointments.date, date);

    return await _appointmentsCollection.Find(filter).ToListAsync();
  }

  // Post new task if it does not conflict with an existing appointment
  public async Task<string> CreateAsync(Appointments appointments)
  {
    var builder = Builders<Appointments>.Filter;

    var endTime = appointments.startTime + appointments.duration;

    var lowRangeTimeFilter = builder.Lte(u => u.startTime, appointments.startTime) &
      builder.Gte(u => u.endTime, appointments.startTime);

    var highRangeTimeFilter = builder.Lte(u => u.startTime, endTime) &
      builder.Gte(u => u.endTime, endTime);

    var timeCheckFilter = builder.Eq(u => u.isCancelled, false) &
      builder.Eq(u => u.isComplete, false) &
      builder.Eq(u => u.date, appointments.date) &
      builder.Eq(u => u.staffName, appointments.staffName) &
      builder.Or(new[] { lowRangeTimeFilter, highRangeTimeFilter });

    var timeCheck = await _appointmentsCollection.Find(timeCheckFilter).ToListAsync();

    // TODO: exception handling instead of below
    if (timeCheck.Count == 0)
    {
      await _appointmentsCollection.InsertOneAsync(appointments);
      Console.WriteLine("new entry added");
      return Constants.Success;
    }
    else
    {
      Console.WriteLine("duplicate entry, no entry added");
      return Constants.Duplicate;
    }
  }

  // Edit Appointment details
  public async Task EditAppointmentAsync(Appointments appointments)
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(u => u.id, appointments.id);

    await _appointmentsCollection.ReplaceOneAsync(filter, appointments);
    return;
  }

  // Complete Appointment
  public async Task CompleteAppointmentAsync(Appointments appointments)
  {
    var builder = Builders<Appointments>.Filter;
    var filter = builder.Eq(u => u.id, appointments.id);
    var update = Builders<Appointments>.Update.Set("isComplete", true);

    await _appointmentsCollection.UpdateOneAsync(filter, update);
    return;
  }

}