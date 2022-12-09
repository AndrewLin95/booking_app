const express = require("express");
const MilanoAppointments = require('../models/MilanoAppointments');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// retrieve all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await MilanoAppointments.find({});
    res.status(200).json({ appointments : appointments});
  } catch (err) {
    res.status(500).send(err);
  }
})

// retrieve appointments by date
app.get('/api/appointments/:date', async (req, res) => {
  console.log(req.params.date);
  try {
    const appointments = await MilanoAppointments.find({ date: req.params.date });
    res.status(200).json({ appointments : appointments});
  } catch (err) {
    res.status(500).send(err);
  }
})

// add appointment date
app.post('/api/appointments', async (req, res) => {
  let appointmentsObj = req.body;

  try {
    const incomingTimeRangeLow = appointmentsObj.startTime 
    const incomingTimeRangeHigh = appointmentsObj.startTime + appointmentsObj.duration

    // 1) query mongoDB to see if there is an existing entry with the same time, date and staff
    const timeCheck = await MilanoAppointments.find(
      {$and: [
        {startTime: {$gte: incomingTimeRangeLow, $lte: incomingTimeRangeHigh}}, 
        {endTime: {$lte: incomingTimeRangeLow, $gte: incomingTimeRangeHigh}},
        {date : {$eq: appointmentsObj.date}},
        {staffName: {$eq: appointmentsObj.staffName}}
      ]})
    
    console.log(timeCheck);
    // 2) determine if that entry has the same staff as the req object
    if (Object.keys(timeCheck).length === 0) {
      console.log('error, LOOK HERE');
      res.sendStatus(400);
      return;
    } else {
      const appointments = new MilanoAppointments(appointmentsObj);
      await appointments.save();
      res.sendStatus(200);
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;