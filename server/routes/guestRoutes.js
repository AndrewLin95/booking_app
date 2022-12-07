const express = require("express");
const guestModel = require('../models/guests');
const app = express();

app.get('api/guests', async (req, res) => {
  const guests = await guestModel.find({});
  console.log(guests);
  
  try {
    res.send(guests);
  } catch (err) {
    this.res.status(500).send(error);
  }
})

module.exports = app;