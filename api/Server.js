
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('../Config');

const port = 3002;
const bodyParser = require("body-parser");
const route = require('../Routes/Routes');
const axios = require('axios')

app.use(cors({
  origin: '*', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Include cookies if needed
}));
app.use(express.json());
app.use(bodyParser.json());

app.get('/getout', (req, res) => {
  return res.status(200).json({ message: "Hello from Express.js!" });
});


app.use('/',route);


app.use((req, res) => {
  res.status(404).send("Route not found.");
});


app.listen(port, () => {
  console.log(`Server started on ${port}`);
});





module.exports = app;