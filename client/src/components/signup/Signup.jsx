import React, { useState } from 'react';
import "./Signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleAddUser = async () => {

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        name,
        email,
        password,
      }, { headers: { 'Content-Type': 'application/json' } });

      localStorage.setItem("userData", JSON.stringify(response.data));
      console.log(response.data)

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <h3>Join us!</h3>
      <form>
        <div>
          <label htmlFor="fullName"></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </div>


        <button type="button" onClick={() => {
          handleAddUser()
          navigate("/user/login")
        }}>
          Sign Up
        </button>
      </form>

      <div className="alternative-login">
        <p>Or sign up with:</p>
        <button className="facebook-signup">Facebook</button>
        <button className="google-signup">Google</button>
      </div>
    </div>
  );
};

export default Signup;