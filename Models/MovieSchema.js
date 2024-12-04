const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    moviePoster: {
      type: String,
      require: true,
    },
    movieTitle: {
      type: String,
      require: true,
    },
    genre: {
      type: Array,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
      
    },
    releaseYear: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    summery: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
