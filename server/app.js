const path = require('path')
require('dotenv').config()
const bodyParser = require("body-parser");
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

//Paths
const guestRouter = require('./routes/guestRoutes');
const staffRouter = require('./routes/staffRoute');
const serviceRouter = require('./routes/serviceRoute');
const appointmentRoutes = require('./routes/appointmentRoutes');

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDBUriKey = process.env.mongoAtlasUri;
mongoose.connect(mongoDBUriKey, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once("open", () => console.log("Connected to DB!"));

//Routes
app.use(guestRouter);
app.use(staffRouter);
app.use(serviceRouter);
app.use(appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});