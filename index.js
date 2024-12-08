require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const wrapAsync = require("./Error/wrapAsync");

const {
  postUser,
  getData,
  getTrendingData,
  getBannerData,
  getSingleData,
  updateData,
  deleteUser,
  AddUser,
  readUser,
  createFavoriteMovie,
  readFavoriteMovie,
  searchMovie,
  deleteFavoriteMovie,
} = require("./controller/CRUDOperation");
const Movie = require("./Models/MovieSchema");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://assorted-team.surge.sh",
      "https://movie-portal-abed2.web.app",
      "https://console.firebase.google.com/project/movie-portal-abed2/overview",
    ],
  })
);
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

// Read Trending Data
app.get("/trendingMovie", getTrendingData);

// Read Data Banner
app.get("/movieBanner", getBannerData);

// Read Single Data
app.get("/movies/:id", getSingleData);

// Search
app.post("/search", searchMovie);

// Update Data
app.put("/movies/:id", updateData);

// Delete Data
app.delete("/movies/:id", deleteUser);

// Create User
app.post("/user", AddUser);

// Read User
app.get("/user", readUser);

// Read Favorite Movie
app.get("/favorite", readFavoriteMovie);

// Create Favorite Movie
app.post("/favorite", createFavoriteMovie);

// Delete Favorite Movie
app.delete("/favorite/:id", deleteFavoriteMovie);

// Path Not Found
app.use((req, res, next) => {
  next();
});

// Handle Async & Sync Error
app.use((err, req, res, next) => {
  console.log(err);
  res.send({
    message: "Oops! Something went wrong.",
    success: false,
  });
});

app.listen(port, () => {
  console.log(`The server is running on Port: ${port}`);
});
