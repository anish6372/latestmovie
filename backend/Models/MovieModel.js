const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String },
  cast: { type: String },
  release_date: { type: Date },
  language: { type: String },
  voting: { type: Number, required: true },
  poster: { type: String }, // This will be the Cloudinary URL
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
