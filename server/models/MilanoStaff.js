const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
}, {versionKey: false})

const MilanoStaff = mongoose.model('MilanoStaff', StaffSchema);

module.exports = MilanoStaff;