import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src="https://as1.ftcdn.net/v2/jpg/01/12/09/12/1000_F_112091233_xghsriqmHzk4sq71lWBL4q0e7n9QJKX6.jpg"
          width="50"
          height="50"
          alt="Admin Profile"
        />
        <span>Admin</span>
      </div>
      <h2 onClick={() => navigate("/admin-dashboard")}>
        <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '10px' }} />
        Dashboard
      </h2>
      <h2 onClick={() => navigate("/adminLanguages")}>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />
        Lessons
      </h2>
      <h2 onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
        Logout
      </h2>
    </div>
  );
};

export default Sidebar;
