import React,{useState,useEffect} from 'react'

const User2 = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const res = await fetch("http://localhost:8000/api/movies");
            const jsonResponse = await res.json();
            const movies = jsonResponse.movies || [];
            setMovies(movies);
            setFilteredMovies(movies);
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        };
        fetchMovies();
      }, []);
    
      const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);
    
        const filtered = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue)
        );
        setFilteredMovies(filtered);
      };
    
      const handleVoteChange = async (index, change) => {
        const updatedMovies = [...movies];
        updatedMovies[index].voting = Math.max(0, updatedMovies[index].voting + change);
    
        setMovies(updatedMovies);
        setFilteredMovies(updatedMovies);
    
        try {
          const movieId = updatedMovies[index]._id;
          await fetch(`http://localhost:8000/api/movies/${movieId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ voting: updatedMovies[index].voting }),
          });
        } catch (error) {
          console.error("Error updating vote:", error);
        }
      };
  return (
    <div className="min-h-screen bg-gray-100 py-6">
    <h1 className="text-4xl font-bold mb-6 text-center">Movies List</h1>
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={handleSearchChange}
        className="w-96 p-2 border rounded"
      />
    </div>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6"
            style={{ height: "450px", width: "450px" }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm">
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p className="text-sm">
              <strong>Director:</strong> {movie.director}
            </p>
            <p className="text-sm">
              <strong>Starring:</strong> {movie.cast?.join(", ") || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="text-sm">
              <strong>Votes:</strong> {movie.voting}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleVoteChange(index, 1)}
                className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700"
              >
                Vote Up
              </button>
              <button
                onClick={() => handleVoteChange(index, -1)}
                className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700"
              >
                Vote Down
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  </div>
  )
}

export default User2
