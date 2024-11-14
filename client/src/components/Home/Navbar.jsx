import React from 'react';
import '../Home/Navbar.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate=useNavigate()
  return (
    <div className="navbar">
      <div className="nav-links">
        <a onClick={()=>navigate("/")}>Home</a>
        <a >Lessons</a>
      </div>
      <div className="profile-icon" onClick={()=>navigate("/Profile")} >
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
    </div>
  );
};

export default Navbar;











