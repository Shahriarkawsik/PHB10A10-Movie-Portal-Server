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
const getBannerData = wrapAsync(async (req, res) => {
  const top3User = await Movie.find().sort({ rating: -1 }).limit(3);
  res.send(top3User);
});

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

// Create User
const AddUser = wrapAsync(async (req, res) => {
  const user = new User({ ...req.body });
  await user.save();
  res.send({
    data: user,
    message: "User created successfully",
    success: true,
  });
});

// Read user
const readUser = wrapAsync(async (req, res) => {
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

// Favorite Movie Section

// Create Favorite Movie
const createFavoriteMovie = wrapAsync(async (req, res) => {
  const { email, id } = req.body;
  let favorites = await User.findOne({ email });
  if (favorites.favorite.includes(id))
    return res.send({
      data: favorites,
      message: "Al ready added.",
      success: true,
    });
  favorites.favorite.push(id);
  favorites = await favorites.save();
  return res.send({
    data: favorites,
    message: "Successfully Added in favorite list.",
    success: true,
  });
});

// Read Favorite Movie
const readFavoriteMovie = wrapAsync(async (req, res) => {
  const { email } = req.body;
  const favorites = await User.find({ email }).populate("favorite");
  res.send({ data: favorites, message: "", success: true });
});

// Delete Favorite Movie
const deleteFavoriteMovie = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const favoriteMovieId = mongoose.Types.ObjectId(id);
  let user = await User.findOne({ email, favorite: favoriteMovieId });

  if (!user) {
    return res.send({
      message: "User or Favorite movie not found!",
      success: false,
    });
  }

  user.favorite = user.favorite.filter(
    (movieId) => !movieId.equals(favoriteMovieId)
  );
  await user.save();
  return res.send({ message: "Favorite movie removed.", success: true });
});

module.exports = {
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
  deleteFavoriteMovie,
};
