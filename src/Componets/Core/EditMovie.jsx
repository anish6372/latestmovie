import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    director: '',
    cast: '',
    release_date: '',
    language: '',
    voting: '',
    poster: null,
    trailerUrl: '',
  });

  const [posterPreview, setPosterPreview] = useState(null);

  // Fetch movie details when component mounts
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/movies/${movieId}`);
        const data = await response.json();
        console.log("Movie ID from params:", movieId);
        console.log("Request URL:", `http://localhost:8000/api/editmovies/${movieId}`);


        setFormData({
          title: data.movie.title,
          genre: data.movie.genre,
          director: data.movie.director,
          cast: data.movie.cast.join(', '),
          release_date: data.movie.release_date.split('T')[0],
          language: data.movie.language,
          voting: data.movie.voting,
          poster: data.movie.poster,
          trailerUrl: data.movie.trailerUrl || '',
        });

        // Handle absolute/relative poster URLs
        setPosterPreview(
          data.movie.poster.startsWith('http')
            ? data.movie.poster
            : `http://localhost:8000/${data.movie.poster}`
        );
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle poster file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevDetails) => ({ ...prevDetails, poster: file }));
    setPosterPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'poster' && value) {
        formDataToSend.append(key, value);
      } else if (key !== 'poster') {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(`http://localhost:8000/api/movies/${movieId}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Movie updated successfully!');
        navigate('/'); // Redirect to the movie list
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update movie.');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Error updating movie');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 max-w-lg w-full"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Movie</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Cast</label>
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            placeholder="Actor1, Actor2, Actor3"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Release Date</label>
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Voting</label>
          <input
            type="number"
            name="voting"
            value={formData.voting}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Poster</label>
          {posterPreview && (
            <div className="mb-2">
              <img
                src={posterPreview}
                alt="Poster Preview"
                className="w-32 h-48 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            name="poster"
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Trailer URL</label>
          <input
            type="url"
            name="trailerUrl"
            value={formData.trailerUrl}
            onChange={handleChange}
            placeholder="https://example.com/trailer"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
