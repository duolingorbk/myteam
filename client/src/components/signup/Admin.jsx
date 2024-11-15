import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate();
    
    let user;
    const token = localStorage.getItem('token');
    
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        return <Navigate to="/" replace />;
    }
      
    if (user.type !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <div className="admin-dashboard">
                <div className="admin-header">
                    <h2>Admin Dashboard</h2>
                </div>
             <button>Logout</button>
            </div>
        </div>
    );
};

export default Admin;