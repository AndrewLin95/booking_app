const express = require("express");
const MilanoService = require('../models/MilanoServices');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// const servicesObj = {
//   serviceHeader: "Mens Haircut",
//   serviceName: "Haircut",
//   servicePrice: 20,
// }

// retrieve guest information
app.get('/api/services', async (req, res) => {
  try {
    const services = await MilanoService.find({});
    res.status(200).json({ services : services});
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/api/services', async (req, res) => {
  let servicesObj = req.body;
  try {
    const services = new MilanoService(servicesObj);
    await services.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;