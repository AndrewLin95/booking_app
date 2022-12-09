const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  staffName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  }, 
  duration: {
    type: Number,
    required: true,
  },
  serviceHeader: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }, 
}, {versionKey: false})

const MilanoAppointments = mongoose.model('MilanoAppointments', AppointmentSchema);

module.exports = MilanoAppointments;