// AllRoute.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Componets/Core/Home';
import SignUp from '../Componets/Core/SignUp';
import LogIN from '../Componets/Core/LogIN';
import User from '../Componets/Core/User';
import Navbar from '../Componets/Common/Navbar';
import UploadMovie from '../Componets/UploadMovie';
import User2 from '../Componets/Core/User2';
import EditMovie from '../Componets/Core/EditMovie';

const AllRoute = () => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home toggle={toggle} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIN />} />
          <Route path="/user" element={<User />} />
          <Route path="/upload-movie" element={<UploadMovie/>}/>
          <Route path="/user2" element={<User2/>} />
          <Route path="/edit-movie/:movieId" element={<EditMovie/>} />
        </Routes>
      </div>
    </>
  );
};

export default AllRoute;
