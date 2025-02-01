const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },  
  genre: { type: String, required: true },
  director: { type: String, required: true },
  cast: { type: [String], required: true },  
  release_date: { type: Date, required: true },
  language: { type: String, required: true },
  voting: { type: Number, required: true, default: 0 }, 
  poster: { type: String },
  trailerUrl: { type: String }, 
  rating:{type:String,required:true ,default:4} 
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
