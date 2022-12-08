const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  serviceHeader: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
  }
}, {versionKey: false})

const MilanoService = mongoose.model('MilanoService', ServiceSchema);

module.exports = MilanoService;