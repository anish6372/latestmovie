const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/Cloudinary.config.js'); 
const Movie = require('../Models/MovieModel');
const router = express.Router();


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'movies', 
    allowed_formats: ['jpg', 'png', 'jpeg'], 
  },
});

const upload = multer({ storage }); 


router.post('/movies', upload.single('poster'), async (req, res) => {
  try {
    const { title, genre, director, cast, release_date, language, voting } = req.body;

    
    console.log('Received data:', req.body);

    
    if (!title || !genre || !voting) {
      return res.status(400).json({ error: 'Title, genre, and voting are required' });
    }

    
    const parsedReleaseDate = new Date(release_date);
    if (isNaN(parsedReleaseDate)) {
      return res.status(400).json({ error: 'Invalid release date' });
    }

    const poster = req.file ? req.file.secure_url : null; 

  
    const newMovie = new Movie({
      title,
      genre,
      director,
      cast,
      release_date: parsedReleaseDate,
      language,
      voting,
      poster,
    });

    
    await newMovie.save();

    
    res.status(201).json({ message: 'Movie added successfully!', movie: newMovie });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Error adding movie' });
  }
});


router.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.find().sort({ voting: -1 });
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Error fetching movies' });
    }
  });
  

module.exports = router;
