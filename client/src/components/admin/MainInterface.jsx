import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.01:3000/user/allusers").then((res)=>{
      setUsers(res.data)
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [users]);

  
  const handleDelete = (user)=>{
    console.log(user);
    
    axios.delete(`http://127.0.01:3000/user/deleteUser/${user.id}`).then(()=>{
  
    
      console.log("deleted");
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }



  return (
    <div>
      <div className="header">
        <h1>Mini Language Learning Admin Interface</h1>
      </div>
      <div className="container">
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
          <h2>Dashboard</h2>
          <h2>Languages</h2>
          <h2>Settings</h2>
          <h2>Logout</h2>
        </div>
        <div className="content">
          <div className="card" id="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to the admin interface. Use the sidebar to navigate through different sections.</p>
            <h3 onClick={() => setShow(!show)} className='users'>Users</h3>
            {show && (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn edit-btn">Edit</button>
                        <button className="btn delete-btn" onClick={()=>{handleDelete(user)}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
