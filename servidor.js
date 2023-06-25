const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require('path');
const cors = require('cors');

require("dotenv").config()

const app = express()
const port = 3004;


app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// db connection 

const conn = require('./db/conn')

conn()

const routes = require('./routes/router')
const routesSpotify = require('./routes/spotify')


app.use('/api', routes)
app.use('/apispotify', routesSpotify)




app.listen(port, (req, res ) => {
  console.log(`porta:${port} servidor online`);
})


