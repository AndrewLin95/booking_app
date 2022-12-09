const express = require("express");
const MilanoAppointments = require('../models/MilanoAppointments');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// // retrieve guest information
// app.get('/api/appointments', async (req, res) => {
//   try {
//     // add search by dates
//     const appointments = await MilanoAppointments.find({});
//     res.status(200).json({ appointments : appointments});
//   } catch (err) {
//     res.status(500).send(err);
//   }
// })

app.post('/api/appointments', async (req, res) => {
  let appointmentsObj = req.body;
  try {
    const appointments = new MilanoAppointments(appointmentsObj);
    await appointments.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;