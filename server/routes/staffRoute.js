const express = require("express");
const MilanoStaff = require('../models/MilanoStaff');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// const testData = {
//   firstName: "Alicia",
//   lastName: "Pierce",
//   title: "Manager"
// }

// retrieve guest information
app.get('/api/staffs', async (req, res) => {
  try {
    const staffs = await MilanoStaff.find({});
    res.status(200).json({ staffs : staffs});
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/api/staffs', async (req, res) => {
  let staffObj = req.body;
  try {
    const staffs = new MilanoStaff(staffObj);
    await staffs.save();
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;