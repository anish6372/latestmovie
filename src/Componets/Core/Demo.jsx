import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Demo = () => {
    const [data, setData] = useState(null);
    const [showCompanyInfo, setShowCompanyInfo] = useState(false); 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/movies'); 
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleVoteChange = (index, change) => {
      const updatedData = [...data]; 
      updatedData[index].voting += change; 
      setData(updatedData); 
    };
  
    
    const toggleCompanyInfo = () => {
      setShowCompanyInfo(!showCompanyInfo);
    };
  return (
    <div className="min-h-screen bg-gray-100 py-6">
     
    <div className="bg-gray-500 text-white p-4">
      <ul className="flex gap-8 justify-center">
        <li>
          <button onClick={toggleCompanyInfo} className="hover:text-gray-400">
            Company Info
          </button>
        </li>
      </ul>
    </div>

    
    {showCompanyInfo && (
      <div className="bg-white shadow-md rounded-md p-6 mt-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
        <p className="text-sm"><strong>Company:</strong> Geeksynergy Technologies Pvt Ltd</p>
        <p className="text-sm"><strong>Address:</strong> Sanjayanagar, Bengaluru-56</p>
        <p className="text-sm"><strong>Phone:</strong> XXXXXXXXX09</p>
        <p className="text-sm"><strong>Email:</strong> XXXXXX@gmail.com</p>
      </div>
    )}

    <h1 className="text-4xl font-bold mb-6 text-center">Movies List</h1>
   
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data ? (
        data.map((movie, index) => (
          <div
            key={index}
            className="flex bg-white shadow-md rounded-md p-6 gap-6"
            style={{ height: '450px', width: '450px' }} 
          >
            
            <div className="w-28 h-60 flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            
            <div className="flex flex-col justify-between flex-grow gap-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm">
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p className="text-sm">
                <strong>Director:</strong> {movie.director}
              </p>
              <p className="text-sm">
                <strong>Starring:</strong> {movie.cast}
              </p>
              <p className="text-sm">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className="text-sm">
                <strong>Language:</strong> {movie.language}
              </p>
              <p className="text-sm">
                <strong>Votes:</strong> {movie.voting}
              </p>

            
              <div className="flex gap-2">
                <button
                  onClick={() => handleVoteChange(index, 1)}
                  className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleUp} />
                </button>
                <button
                  onClick={() => handleVoteChange(index, -1)}
                  className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>

              
              <div className="flex-shrink-0">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
  )
}

export default Demo
