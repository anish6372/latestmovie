import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UploadMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    director: '',
    cast: '',
    release_date: '',
    language: '',
    voting: '',
    poster: null,
    trailerUrl: '', // Add a new field for trailer URL
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach((key) => {
      if (key !== 'poster') {  // Skip poster because it's a file
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append the file manually
    if (formData.poster) {
      formDataToSend.append('poster', formData.poster);  // Ensure 'poster' matches the backend's expected field
    }

    try {
      const response = await fetch('http://localhost:8000/api/movies', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Movie added successfully!');
        navigate('/');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to upload movie');
      }
    } catch (err) {
      console.error('Error uploading movie:', err);
      alert('Error uploading movie');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 max-w-lg w-full"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-4">Upload New Movie</h2>
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
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleChange}
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
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UploadMovie;
