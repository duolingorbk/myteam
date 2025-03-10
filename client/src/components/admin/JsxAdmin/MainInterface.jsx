import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../admin/css/interface.css";

const AdminInterface = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  

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
    axios
      .delete(`http://127.0.0.1:3000/user/deleteUser/${user.id}`)
      .then(() => {
        console.log("User deleted");
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-Interface">
      <div className="adminCard">
        <h2 className='dashboard'>Dashboard</h2>
        <p className='welc'>Welcome to the admin interface. Use the sidebar to navigate through different sections.</p>
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
  );
};

export default AdminInterface;
