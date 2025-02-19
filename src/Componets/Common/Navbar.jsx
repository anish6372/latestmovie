import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setToken(null); 
    navigate('/'); 
  };

  return (
    <div className="bg-gray-800 p-4 w-full fixed top-0 z-10 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Movies 365</h1>
      <div className="flex space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
