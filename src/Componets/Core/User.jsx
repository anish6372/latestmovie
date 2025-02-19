import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faEdit,
  
  faTrashAlt,
  faDownload,
  faTimes,faStar
} from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const navigate = useNavigate();

  // Get the role of the logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // Fetch movies on load
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/movies");
        const jsonResponse = await res.json();
        const movies = jsonResponse.movies || [];
        setData(movies);
        setFilteredMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchdata();
  }, []);

 
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.trim();
    setSearch(searchValue);

    const filtered = data.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  
  const handleVoteChange = async (index, change) => {
    const updatedData = [...data];
    updatedData[index].voting = Math.max(0, updatedData[index].voting + change);

    setData(updatedData);
    setFilteredMovies(updatedData);

    try {
      const movieId = updatedData[index]._id;
      await fetch(`http://localhost:8000/api/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voting: updatedData[index].voting,
        }),
      });
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  
  const handleDeleteMovie = async (movieId) => {
    try {
      await fetch(`http://localhost:8000/api/deletemovies/${movieId}`, {
        method: "DELETE",
      });
      setData(data.filter((movie) => movie._id !== movieId));
      setFilteredMovies(filteredMovies.filter((movie) => movie._id !== movieId));
      alert("Movie deleted successfully");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEditMovie = (movieId) => {
    navigate(`/edit-movie/${movieId}`);
  };


  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

 
  const handleWatchTrailer = (trailerUrl) => {
    if (trailerUrl) {
      window.open(trailerUrl, "_blank"); // Opens trailer in new tab
    } else {
      alert("Trailer URL is not available for this movie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="bg-gray-500 text-white p-4">
        <ul className="flex gap-16 justify-center">
          <li>
            <button
              onClick={() => setShowCompanyInfo(!showCompanyInfo)}
              className="hover:text-gray-400"
            >
              Company Info
            </button>
          </li>
          <li className="ms-44 border border-black rounded">
            <input
              type="text"
              placeholder="Enter movie title"
              value={search}
              onChange={handleSearchChange}
              className="w-56 p-1 pl-2 font-bold text-xl border text-yellow-600 focus:outline-none rounded-md"
            />
          </li>
        </ul>

        {isAdmin && (
          <button
            onClick={() => navigate("/upload-movie")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Upload Movie
          </button>
        )}
      </div>

      {showCompanyInfo && (
        <div className="bg-white shadow-md rounded-md p-6 mt-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
          <p className="text-sm">
            <strong>Company:</strong> Geeksynergy Technologies Pvt Ltd
          </p>
          <p className="text-sm">
            <strong>Address:</strong> Sanjayanagar, Bengaluru-56
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> XXXXXXXXX09
          </p>
          <p className="text-sm">
            <strong>Email:</strong> XXXXXX@gmail.com
          </p>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6 text-center">Movies List</h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div
              key={index}
              className="flex bg-white shadow-md rounded-md p-6 gap-6"
              style={{ height: "450px", width: "450px" }}
              onClick={() => handleMovieClick(movie)}
            >
              <div className="w-28 h-60 flex-shrink-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between flex-grow gap-2">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-sm"><strong>Genre:</strong> {movie.genre}</p>
                <p className="text-sm"><strong>Director:</strong> {movie.director}</p>
                <p className="text-sm"><strong>Starring:</strong> {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast || "N/A"}</p>
                <p className="text-sm"><strong>Release Date:</strong> {movie.release_date}</p>
                <p className="text-sm"><strong>Language:</strong> {movie.language}</p>
                <p className="text-sm"><strong>Votes:</strong> {movie.voting}</p>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleVoteChange(index, 1)} className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700">
                    <FontAwesomeIcon icon={faAngleUp} />
                  </button>
                  <button onClick={() => handleVoteChange(index, -1)} className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </button>
                </div>

                <button onClick={() => handleWatchTrailer(movie.trailerUrl)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2">
                  Watch Trailer
                </button>
              </div>
              {isAdmin && (
    <div className="flex  flex-col gap-2 mt-2">
      <button onClick={() => handleEditMovie(movie._id)} className="bg-yellow-500 text-white px-1 py-1 rounded-md hover:bg-yellow-600">
        <FontAwesomeIcon icon={faEdit} /> Edit
      </button>
      <button onClick={() => handleDeleteMovie(movie._id)} className="bg-red-500 text-white px-1 py-1 rounded-md hover:bg-red-600">
        <FontAwesomeIcon icon={faTrashAlt} /> Delete
      </button>
    </div>
  )}
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] transform transition-all duration-300 animate-slideIn">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <div className="flex gap-4">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-60 h-80 object-cover rounded-md" />
              <div>
                <h2 className="text-3xl font-bold">{selectedMovie.title}</h2>
                <p><strong>Genre:</strong> {selectedMovie.genre}</p>
                <p><strong>Director:</strong> {selectedMovie.director}</p>
                <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                <p><strong>Language:</strong> {selectedMovie.language}</p>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < selectedMovie.rating ? "text-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faDownload} /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
