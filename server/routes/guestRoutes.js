const express = require("express");
const MilanoGuest = require('../models/MilanoGuest');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// retrieve guest information
app.get('/api/guests', async (req, res) => {
  try {
    const guests = await MilanoGuest.find({});
    console.log(guests);
    res.status(200).json({ guests : guests});
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/api/guests', async (req, res) => {
  let guestObj = req.body;
  try {
    const guest = new MilanoGuest(guestObj);
    await guest.save();
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;