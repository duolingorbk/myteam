import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate= useNavigate()
  return (
    <div>
      <div className="sidebar">
        <div className="profile">
          <img
            alt="Profile picture of the admin"
            src="https://as1.ftcdn.net/v2/jpg/01/12/09/12/1000_F_112091233_xghsriqmHzk4sq71lWBL4q0e7n9QJKX6.jpg"
            width="50"
            height="50"
          />
          <span>Admin</span>
        </div>
        <h2 onClick={()=>{navigate("/")}}>Dashboard</h2>
        <h2>Users</h2>
        <h2 onClick={()=>{navigate("/adminLanguages")}}>Languages</h2>
        <h2>Logout</h2>
      </div>
    </div>
  );
};

export default Sidebar;
