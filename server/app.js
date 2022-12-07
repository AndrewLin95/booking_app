const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const bodyParser = require("body-parser");
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

//Paths
const guestRouter = require('./routes/guestRoutes');

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDBUriKey = process.env.mongoAtlasUri;
mongoose.connect(mongoDBUriKey, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once("open", () => console.log("Connected to DB!"));


// app.use(guestRouter);

// const express = require("express");
// const guestModel = require('../models/guests');
// const app = express();

const guestModel = require('./models/guests');

app.get('api/guests', async (req, res) => {
  const guests = await guestModel.find({});
  console.log(guests);
  
  try {
    res.send(guests);
  } catch (err) {
    this.res.status(500).send(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});