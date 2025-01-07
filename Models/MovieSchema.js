const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    moviePoster: {
      type: String,
      require: true,
    },
    movieTitle: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: [
        "comedy",
        "drama",
        "horror",
        "adventure",
        "war",
        "crime",
        "action",
        "sci-fi",
      ],
      required: [true, "Please select a genre."],
    },
    duration: { type: Number, required: true, min: 60 },
    releaseYear: {
      type: Number,
      required: true,
      min: 1800,
      max: new Date().getFullYear(),
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    summary: { type: String, required: true },
    authorEmail: { type: String, required: true, match: /.+\@.+\..+/ },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
