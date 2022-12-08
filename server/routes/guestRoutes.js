const express = require("express");
const MilanoGuest = require('../models/MilanoGuest');
const app = express();

const testData = {
  firstName: "Michael",
  lastName: "Doherty",
  phoneNumber: "111-111-3333",
  email: "michael@test.com"
}

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
  try {
    const guest = new MilanoGuest(testData);
    await guest.save();
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;