import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/user/login", {
                email,
                password
            });

            if (response.status === 200) {
                const { token, user } = response.data;

                localStorage.setItem("token", token);
                console.log(token)

                if (user.type === 'admin') {
                    localStorage.setItem("admin", JSON.stringify(user));
                    navigate("/admin-dashboard")
                } else {
                    localStorage.setItem("user", JSON.stringify(user));
                    //navigate("/")
                }
                setError("")//(to remove the error if the written password is correct)
            }
            navigate("/")
        } catch (err) {
            console.error(err);

            if (err.response.data.message === "Invalid credentials") {
                setError("Incorrect password. Please try again.");
            } else {
                setError("An error occurred during login. Please try again later.");
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="form-input"
                    />
                </div>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                <button type="submit" className="login-button"  >Login</button>

              

               
            </form>
            <div className="signup-link">
                    <p>
                        Don't have an account? <a  className="signup-link-text" onClick={()=>navigate("/user/signup")}>Sign up</a>
                    </p>
                </div>
        </div>
    );
};

export default Login;