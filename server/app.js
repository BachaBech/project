console.clear();
const cors= require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

const app = express();

// Configure ENV File & Require Connection File
dotenv.config({ path: "./config.env" });
require("./db/conn");
const port = process.env.PORT;

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require ('./routes/User'))

// Run server
app.listen(port, () => {
    console.log("Server is Listening");
  });