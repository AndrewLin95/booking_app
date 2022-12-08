const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
}, {versionKey: false})

const MilanoGuest = mongoose.model('MilanoGuest', GuestSchema);

module.exports = MilanoGuest;