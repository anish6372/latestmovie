import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Componets/Core/SignUp';
import LogIN from './Componets/Core/LogIN';
import User from './Componets/Core/User';
import Navbar from './Componets/Common/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> 
        <Routes>
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIN />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
