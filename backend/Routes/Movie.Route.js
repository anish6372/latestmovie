const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
const Movie = require('../Models/MovieModel');
const router = express.Router();

// Cloudinary configuration (directly hardcoded)
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

// Add movie with poster upload
router.post('/movies', upload.single('poster'), async (req, res) => {
  console.log(req.body);

  try {
    const { title, genre, director, cast, release_date, language, voting, trailerUrl } = req.body;

    // Validate required fields
    if (!title || !genre || !voting) {
      return res.status(400).json({ error: 'Title, genre, and voting are required.' });
    }

    // Parse release date
    const parsedReleaseDate = release_date ? new Date(release_date) : null;
    if (release_date && isNaN(parsedReleaseDate)) {
      return res.status(400).json({ error: 'Invalid release date format.' });
    }

    // Ensure a poster was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Poster is required.' });
    }

    // Poster URL from Cloudinary
    const posterUrl = req.file.path;

    // Create new movie instance
    const newMovie = new Movie({
      title,
      genre,
      director,
      cast: cast ? cast.split(',') : [], // Convert cast to an array
      release_date: parsedReleaseDate,
      language,
      voting: parseInt(voting, 10), // Ensure voting is a number
      poster: posterUrl,
      trailerUrl,  // Include the trailer URL here
    });

    // Save movie to the database
    await newMovie.save();

    res.status(201).json({
      message: 'Movie added successfully!',
      movie: newMovie,
    });
  } catch (error) {
    console.error('Error during movie upload:', error);
    res.status(500).json({ error: 'Failed to add movie.' });
  }
});

// Update Movies 
router.put('/movies/:id', upload.single('poster'), async (req, res) => {
  console.log("Id is ",req.params.id);
  const {id}=req.params;

  try {
    const {
            title,
            genre,
            director,
            cast,
            release_date,
            language,
            voting,
            trailerUrl,
          } = req.body;
   
          const parsedReleaseDate = new Date(release_date);
              if (isNaN(parsedReleaseDate.getTime())) {
                return res.status(400).json({ error: 'Invalid release date format.' });
              }
          
              // Ensure voting is a valid number
              const votingNumber = parseInt(voting, 10);
              if (isNaN(votingNumber)) {
                return res.status(400).json({ error: 'Voting must be a valid number.' });
              }
          
              // Build the poster URL
              let posterUrl;
              if (req.file) {
                const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
                posterUrl = `${req.file.path.replace(/\\/g, '/')}`; // Adjust for cross-platform paths
              }

              const updatedMovie = await Movie.findByIdAndUpdate(
                id,
                      {
                        title,
                        genre,
                        director,
                        cast: cast ? cast.split(',') : undefined, // Convert cast string to array if provided
                        release_date: parsedReleaseDate,
                        language,
                        voting: votingNumber,
                        poster: posterUrl || undefined, // Use new poster URL if uploaded
                        trailerUrl: trailerUrl || undefined, // Update trailer URL if provided
                      },
                      { new: true } // Return the updated document
                    );
                
                    // If the movie is not found, return an error
                    if (!updatedMovie) {
                      return res.status(404).json({ error: 'Movie not found.' });
                    }
                
                    // Return the updated movie details
                  return  res.status(200).json({
                      message: 'Movie updated successfully!',
                      movie: updatedMovie,
                    });
 

   
  } catch (error) {
    console.error('Error during movie upload:', error);
    res.status(500).json({ error: 'Failed to add movie.' });
  }
});


// Fetch all movies with sorting and optional pagination
router.get('/movies', async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    // Parse and validate pagination parameters
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) {
      console.warn(`Invalid page value: ${req.query.page}`);
      page = 1;
    }

    if (isNaN(limit) || limit < 1) {
      console.warn(`Invalid limit value: ${req.query.limit}`);
      limit = 10;
    }

    const skip = (page - 1) * limit;

    // Fetch movies from the database
    const movies = await Movie.find()
      .sort({ voting: -1 }) // Sort by voting in descending order
      .skip(skip)
      .limit(limit)
      .lean();

    // Count total documents
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    // Return the results
    res.json({
      totalMovies,
      currentPage: page,
      totalPages,
      movies,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies.' });
  }
});

module.exports = router;
