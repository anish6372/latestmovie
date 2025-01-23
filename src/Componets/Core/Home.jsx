import React from 'react';
import LogIN from './LogIN'; 
import SignUp from './SignUp'; 

const Home = ({ toggle }) => {
  return (
    <div className="flex flex-1 justify-center items-center bg-gray-100 min-h-screen">
      {toggle ? <SignUp /> : <LogIN />}
    </div>
  );
};

export default Home;