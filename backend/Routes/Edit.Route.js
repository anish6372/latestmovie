// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Movie = require('../Models/MovieModel'); // Import your Movie model

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to save uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Unique filename
//   },
// });

// const upload = multer({ storage });

// // Route to handle updating a movie
// router.put('/api/editmovies/:movieId', upload.single('poster'), async (req, res) => {
//   try {
//     const movieId = req.params.movieId;

//     // Log incoming request details for debugging
//     console.log('Request Params (movieId):', movieId);
//     console.log('Request Body:', req.body);
//     console.log('Uploaded File:', req.file ? req.file.path : 'No file uploaded');

//     const {
//       title,
//       genre,
//       director,
//       cast,
//       release_date,
//       language,
//       voting,
//       trailerUrl,
//     } = req.body;

//     // Parse the release date
//     const parsedReleaseDate = new Date(release_date);
//     if (isNaN(parsedReleaseDate.getTime())) {
//       return res.status(400).json({ error: 'Invalid release date format.' });
//     }

//     // Ensure voting is a valid number
//     const votingNumber = parseInt(voting, 10);
//     if (isNaN(votingNumber)) {
//       return res.status(400).json({ error: 'Voting must be a valid number.' });
//     }

//     // Build the poster URL
//     let posterUrl;
//     if (req.file) {
//       const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
//       posterUrl = `${baseUrl}/${req.file.path.replace(/\\/g, '/')}`; // Adjust for cross-platform paths
//     }

//     // Update the movie in the database
//     const updatedMovie = await Movie.findByIdAndUpdate(
//       movieId,
//       {
//         title,
//         genre,
//         director,
//         cast: cast ? cast.split(',') : undefined, // Convert cast string to array if provided
//         release_date: parsedReleaseDate,
//         language,
//         voting: votingNumber,
//         poster: posterUrl || undefined, // Use new poster URL if uploaded
//         trailerUrl: trailerUrl || undefined, // Update trailer URL if provided
//       },
//       { new: true } // Return the updated document
//     );

//     // If the movie is not found, return an error
//     if (!updatedMovie) {
//       return res.status(404).json({ error: 'Movie not found.' });
//     }

//     // Return the updated movie details
//     res.status(200).json({
//       message: 'Movie updated successfully!',
//       movie: updatedMovie,
//     });
//   } catch (error) {
//     console.error('Error during movie update:', error);
//     res.status(500).json({ error: 'Failed to update movie.' });
//   }
// });

// module.exports = router;
