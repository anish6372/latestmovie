const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
const Movie = require('../Models/MovieModel');
const { log } = require('console');
const router = express.Router();
const mongoose=require('mongoose');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dohajvmzw',
  api_key: '549381837364977',
  api_secret: '88YpmyGAVJmqz-fpYO7soQzXlqw',
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'movies',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Edit movie details route



router.delete('/deletemovies/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
     
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid movie ID.' });
      }
  
      
      const movie = await Movie.findByIdAndDelete({_id:id});
  
     console.log("movie is ",movie);
     
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found.' });
      }
  
      
      res.json({
        message: 'Movie deleted successfully!',
        movie,
      });
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Failed to delete movie.' });
    }
  });
  
  

module.exports = router;
