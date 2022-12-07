const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: {
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
})

const Guests = mongoose.model('Guests', GuestSchema);

module.exports = Guests;