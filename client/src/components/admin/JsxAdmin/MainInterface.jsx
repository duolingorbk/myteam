import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../admin/css/interface.css"

const AdminInterface = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setrefresh] = useState(false)

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
  }, [refresh]);

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
                        <button className="btn delete-btn" onClick={() => {handleDelete(user) , setrefresh(!refresh)}}>
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

export default AdminInterface;