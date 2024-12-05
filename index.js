require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const wrapAsync = require("./Error/wrapAsync");

const {
  postUser,
  getData,
  getTrendingData,
  getBannerData,
  getSingleData,
  updateData,
  deleteUser,
  AddUser,
  createFavoriteMovie,
  readFavoriteMovie,
  deleteFavoriteMovie,
} = require("./controller/CRUDOperation");
const Movie = require("./Models/MovieSchema");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", true);

// connection database
const uri = process.env.MONGODB_URI;
mongoose.connect(uri).then(() => console.log("Database connected"));

// Create Data
app.post("/movies", postUser);

// Read Data
app.get("/", (req, res) => {
  res.send("Welcome to Movie");
});
// Read Data
app.get("/movies", getData);

// Read Data Banner
app.get("/movieBanner", getBannerData);

// Read Single Data
app.get("/movies/:id", getSingleData);

// Update Data
app.put("/movies/:id", updateData);

// Delete Data
app.delete("/movies/:id", deleteUser);

// Add User
app.post("/user", AddUser);

// Create Favorite Movie
app.post("/favorite", createFavoriteMovie);

// Read Favorite Movie
app.get("/favorite", readFavoriteMovie);

// Delete Favorite Movie
app.delete("/favorite/:id", deleteFavoriteMovie);

app.listen(port, () => {
  console.log(`The server is running on Port: ${port}`);
});
