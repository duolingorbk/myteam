import React, { useState } from 'react';
import "./Signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validateStrongPassword = (password) => {

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
        errors.push("Password must contain at least one uppercase letter");
    }
    if (!hasLowerCase) {
        errors.push("Password must contain at least one lowercase letter");
    }
    if (!hasNumbers) {
        errors.push("Password must contain at least one number");
    }
    if (!hasSpecialCharacters) {
        errors.push("Password must contain at least one special character");
    }

    return {
        isValid: errors.length === 0, //this is a returned oject that shows if the password is valid the errors array will have 0 length
        errors: errors//this is an array that includes all of the above errors if any of them is not included in the password 
    };
};

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'speakeasy');
    data.append('cloud_name', 'dog9364lq');
    console.log(image)

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dog9364lq/image/upload", data);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleAddUser = async () => {
    try {

      const passwordValidation = validateStrongPassword(password);
      if (!passwordValidation.isValid) {
        setError("Password is too weak:");
        passwordValidation.errors.forEach((err) => setError((prev) => prev + " \n " + err));
        return;
      }

      const response = await axios.post("http://localhost:3000/user/signup", {
        name,
        email,
        password,
        imageUrl,
      }, { headers: { 'Content-Type': 'application/json' } });


      console.log(response.data);
      setError("");

      navigate("/user/login");

    } catch (error) {
      if (error.response.data === "User already exists") {
        setError("Email address is already registered. Please use a different email.");
      } else {
        console.error(error);
        setError("An error occurred during signup. Please try again later.");
      }
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

        <div className="form-group">
          <label htmlFor="image">Add Image: </label>
          <input
            id="image"
            className="form-input"
            required
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button onClick={handleImageUpload}>Upload</button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <button type="button" onClick={handleAddUser}>
          Sign Up
        </button>
      </form>
      <div className="signup-link">
                    <p>
                        You already have an account? <a  className="login-link-text" onClick={()=>navigate("/user/login")}>Login</a>
                    </p>
                </div>
    </div>
  );
};

export default Signup;