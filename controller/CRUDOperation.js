const Movie = require("../Models/MovieSchema");
const User = require("../Models/user");
const wrapAsync = require("../Error/wrapAsync");

// Added
// Create A Data
const postUser = wrapAsync(async (req, res) => {
  const postData = new Movie({ ...req.body });
  const saveToDatabase = await postData.save();
  res.send({
    data: saveToDatabase,
    message: "Successfully created",
    success: true,
  });
});

// Added
// Read All Data
const getData = wrapAsync(async (req, res) => {
  const allMovie = await Movie.find();

  if (!allMovie.length) {
    return res.send({
      data: allMovie,
      message: "No movie found!",
      success: false,
    });
  }
  return res.send({ data: allMovie, message: "All Movies", success: true });
});
// Added
// Read Trending Data
const getTrendingData = wrapAsync(async (req, res) => {
  const trendingMovies = await Movie.find().sort({ rating: -1 }).limit(6);

  if (!trendingMovies.length) {
    return res.send({
      data: trendingMovies,
      message: "No trending movie found!",
      success: false,
    });
  }
  return res.send({
    data: trendingMovies,
    message: "All trending movie is found!",
    success: true,
  });
});

// Read Data Banner
const getBannerData = async (req, res) => {
  const top3User = await Movie.find().sort({ rating: -1 }).limit(3);
  res.send(top3User);
};

// Added
// Read Single Data
const getSingleData = async (req, res) => {
  const id = req.params.id;
  const singleUser = await Movie.findById(id);
  if (!singleUser) {
    return res.send({
      data: allMovie,
      message: "No movie found!",
      success: false,
    });
  }
  return res.send({
    data: singleUser,
    message: "Your desire movie is found",
    success: true,
  });
};

// Added
// Update Data
const updateData = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  return res.send({
    data: updatedMovie,
    message: "Successfully updated 😊",
    success: true,
  });
});

// Added
// Delete Data
const deleteUser = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const deleted = await Movie.findByIdAndDelete(id);
  if (!deleted) {
    return res.send({ message: "Failed to delete.", success: false });
  }
  return res.send({ message: "Successfully deleted.", success: true });
});

module.exports = {
  postUser,
  getData,
  getTrendingData,
  getBannerData,
  getSingleData,
  updateData,
  deleteUser,
};
