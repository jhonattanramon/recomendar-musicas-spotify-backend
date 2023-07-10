const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");


require("dotenv").config();

const app = express();
const port = 3004;

app.use(express.json());
app
  .use(express.static(__dirname + "./public"))
  .use(cors())
  .use(cookieParser());

// db connection

const conn = require("./db/conn");

conn();

const routes = require("./routes/router");

app.use("/", routes);

app.listen(port, (req, res) => {
  console.log(`porta:${port} servidor online`);
});
