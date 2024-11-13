import React from 'react';
import '../Home/Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#lessons">Lessons</a>
      </div>
      <div className="profile-icon">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
    </div>
  );
};

export default Navbar;











