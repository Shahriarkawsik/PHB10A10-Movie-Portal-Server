const Movie = require("../Models/MovieSchema");

// Create Data
const postUser = async (req, res) => {
  const postData = new Movie(req.body);
  await postData.save();
  res.send({ message: "Data post Successfully." });
};

// Read Data
const getData = async (req, res) => {
  const allUser = await Movie.find();
  res.send(allUser);
};

// Read Single Data
const getSingleData = async (req, res) => {
  const id = req.params.id;
  const singleUser = await Movie.findById(id);
  res.send(singleUser);
};

// Update Data
const updateData = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  await Movie.findByIdAndUpdate(id, updateData);
  res.send("Update Successful.");
};

// Delete Data
const deleteUser = async (req, res) => {
  const id = req.params.id;
  await Movie.findByIdAndDelete(id);
  res.send("Delete a user successfully.");
};

module.exports = { postUser, getData, getSingleData, updateData, deleteUser };
