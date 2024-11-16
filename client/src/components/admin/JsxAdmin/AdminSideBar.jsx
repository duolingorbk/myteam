import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
      // window.location.reload()
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src="https://as1.ftcdn.net/v2/jpg/01/12/09/12/1000_F_112091233_xghsriqmHzk4sq71lWBL4q0e7n9QJKX6.jpg"
          width="50"
          height="50"
        />
        <span>Admin</span>
      </div>
      <h2 onClick={() => navigate("/admin-dashboard")}>Dashboard</h2>
      <h2 onClick={() => navigate("/adminLanguages")}>Lessons</h2>
      <h2 onClick={()=>handleLogout()}>Logout</h2> 
    </div>
  );
};

export default Sidebar;
