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
  const validatePassword=(password)=>{
    const errors=[]
    const passwordChecking=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if(password.length<8){
        errors.push("Password must contain at least 8 characters.")
    }
    if(!passwordChecking.test(password)){
        errors.push("Password must contain at least one upper case, one lower case, and one symbol")
    }
    return {
        isValid:errors.length===0,
        errors:errors
    }
}
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'speakeasy');
    data.append('cloud_name', 'dc9siq9ry');
    console.log(image)

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dc9siq9ry/image/upload", data);
      setImageUrl(response.data.secure_url);
      console.log(imageUrl)
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleAddUser = async () => {
    try {

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setError("Password is too weak:");
        passwordValidation.errors.forEach((err) => setError((element) => element + "  " + err));
        return;
      }

      const response = await axios.post("http://localhost:3000/user/signup", {
        name,
        email,
        password,
        image: imageUrl,
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
      <form className='signup-form'>
      <h3>Join us!</h3>
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
          <button className='upload-button' onClick={handleImageUpload}>Upload</button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <button  className='signup-button'type="button" onClick={handleAddUser}>
          Sign Up
        </button>
      <div className="signup-link">
                    <p>
                        You already have an account? <a  className="login-link-text" onClick={()=>navigate("/user/login")}>Login</a>
                    </p>
                </div>
      </form>
    </div>
  );
};

export default Signup;