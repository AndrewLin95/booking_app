const express = require("express");
const MilanoAppointments = require('../models/MilanoAppointments');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// retrieve all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await MilanoAppointments.find({ 
      isComplete: {$eq: false}, 
      isCancelled: {$eq: false},
    });
    res.status(200).json({ appointments : appointments});
  } catch (err) {
    res.status(500).send(err);
  }
})

// retrieve appointments by date
app.get('/api/appointments/:date', async (req, res) => {
  console.log(req.params.date);
  try {
    const appointments = await MilanoAppointments.find({ 
      date: req.params.date,       
      isComplete: {$eq: false}, 
      isCancelled: {$eq: false}, 
    });
    res.status(200).json({ appointments : appointments});
  } catch (err) {
    res.status(500).send(err);
  }
})

// retrieve compelted dates

// add appointment date
app.post('/api/appointments', async (req, res) => {
  let appointmentsObj = req.body;

  try {
    const incomingTimeRangeLow = appointmentsObj.startTime 
    const incomingTimeRangeHigh = appointmentsObj.startTime + appointmentsObj.duration

    // 1) query mongoDB to see if there is an existing entry with the same time, date and staff
    const timeCheck = await MilanoAppointments.find({
      date: {$eq: appointmentsObj.date}, 
      staffName: {$eq: appointmentsObj.staffName},
      isComplete: {$eq: false}, 
      isCancelled: {$eq: false},
      $or: [{
        startTime: {$lte: incomingTimeRangeLow}, endTime: {$gte: incomingTimeRangeLow}
      },{
        startTime: {$lte: incomingTimeRangeHigh}, endTime: {$gte: incomingTimeRangeHigh}
      }] 
    })

    console.log(timeCheck);
    // 2) determine if that entry has the same staff as the req object
    if (Object.keys(timeCheck).length != 0) {
      console.log('error, LOOK HERE');
      res.sendStatus(400);
      return;
    } else {
      const appointments = new MilanoAppointments(appointmentsObj);
      await appointments.save();
      res.send({ status: "success"});
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

// edit appointment dates
app.put('/api/appointments', async (req, res) => {
  let appointmentsObj = req.body;

  const newTimeRangeLow = appointmentsObj.newData.startTime
  const newTimeRangeHigh = appointmentsObj.newData.endTime

  const filter = {
    date: {$eq: appointmentsObj.inputData.date}, 
    staffName: {$eq: appointmentsObj.inputData.staffName},
    startTime: {$eq: appointmentsObj.inputData.startTime},
    endTime: {$eq: appointmentsObj.inputData.endTime},
    isComplete: {$eq: false}, 
    isCancelled: {$eq: false},
  }

  try {
    // check if new time and staff is available
    const timeCheck = await MilanoAppointments.find({
      date: {$eq: appointmentsObj.newData.date}, 
      staffName: {$eq: appointmentsObj.newData.staffName},
      isComplete: {$eq: false}, 
      isCancelled: {$eq: false},
      $or: [{
        startTime: {$lte: newTimeRangeLow}, endTime: {$gte: newTimeRangeLow}
      },{
        startTime: {$lte: newTimeRangeHigh}, endTime: {$gte: newTimeRangeHigh}
      }] 
    })

    if (Object.keys(timeCheck).length != 0) {
      console.log('error, duplicate time');
      res.sendStatus(400);
      return;
    } else {
      // now we can update data
      await MilanoAppointments.findOneAndUpdate(filter, appointmentsObj.newData, {new: true})
      res.send({ status: "success"});
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

// complete appointments by setting isComplete to true
app.put('/api/appointments/complete', async (req, res) => {
  let appointmentsObj = req.body;

  const filter = {
    date: {$eq: appointmentsObj.date}, 
    staffName: {$eq: appointmentsObj.staffName},
    startTime: {$eq: appointmentsObj.startTime},
    endTime: {$eq: appointmentsObj.endTime},
    isComplete: {$eq: false}, 
    isCancelled: {$eq: false},
  }

  const newObj = {
    guestName: appointmentsObj.guestName,
    staffName: appointmentsObj.staffName,
    startTime: appointmentsObj.startTime,
    endTime: appointmentsObj.endTime,
    duration: appointmentsObj.duration,
    serviceHeader: appointmentsObj.serviceHeader,
    date: appointmentsObj.date,
    isComplete: true,
    isCancelled: appointmentsObj.isCancelled,
  }

  try {
    await MilanoAppointments.findOneAndUpdate(filter, newObj, {new: true})
    res.send({ status: "success"});
  } catch (err) {
    res.status(500).send(err);
  }
})

// cancels appointments by setting isComplete to true
app.put('/api/appointments/cancel', async (req, res) => {
  let appointmentsObj = req.body;

  const filter = {
    date: {$eq: appointmentsObj.date}, 
    staffName: {$eq: appointmentsObj.staffName},
    startTime: {$eq: appointmentsObj.startTime},
    endTime: {$eq: appointmentsObj.endTime},
    isComplete: {$eq: false}, 
    isCancelled: {$eq: false},
  }

  const newObj = {
    guestName: appointmentsObj.guestName,
    staffName: appointmentsObj.staffName,
    startTime: appointmentsObj.startTime,
    endTime: appointmentsObj.endTime,
    duration: appointmentsObj.duration,
    serviceHeader: appointmentsObj.serviceHeader,
    date: appointmentsObj.date,
    isComplete: appointmentsObj.isComplete,
    isCancelled: true,
  }

  try {
    await MilanoAppointments.findOneAndUpdate(filter, newObj, {new: true})
    res.send({ status: "success"});
  } catch (err) {
    res.status(500).send(err);
  }
})
module.exports = app;