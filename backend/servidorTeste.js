require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require('path')


const app = express()
const port = 3003

app.listen(port, (req, res ) => {
  res.send('hello world')
})

app.use(log)


