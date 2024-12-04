const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const {
  postUser,
  getData,
  getSingleData,
  updateData,
  deleteUser,
} = require("./controller/CRUDOperation");
const Movie = require("./Models/MovieSchema");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", true);

/*********** MondoDB ***********/
const uri = process.env.MONGODB_URI;

// connection database
mongoose.connect(uri);

// Create Data
app.post("/movies", postUser);

// Read Data
app.get("/", (req, res) => {
  res.send("Welcome to Movie");
});
// Read Data
app.get("/movies", getData);

// Read Single Data
app.get("/movies/:id", getSingleData);

// Update Data
app.put("/movies/:id", updateData);

// Delete Data
app.delete("/movies/:id", deleteUser);

app.listen(port, () => {
  console.log(`The server is running on Port: ${port}`);
});
