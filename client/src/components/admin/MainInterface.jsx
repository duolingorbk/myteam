import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  // Fetch users data from the API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/user/allusers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  const handleDelete = (user) => {
    // Delete user logic
    axios
      .delete(`http://127.0.0.1:3000/user/deleteUser/${user.id}`)
      .then(() => {
        console.log("User deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      
      <div className="container">        
        {/* Main content */}
        <div className="content">
          <div className="card" id="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to the admin interface. Use the sidebar to navigate through different sections.</p>
            <h3 onClick={() => setShow(!show)} className="users">Users</h3>
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
                        <button className="btn delete-btn" onClick={() => handleDelete(user)}>
                          Delete
                        </button>
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
