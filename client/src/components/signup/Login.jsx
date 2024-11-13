import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:3000/user/login",
                {
                    email,
                    password

                })
            if (response.status === 200) {
                const { token, user } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user))

            }
        }

        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue=""
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
                        defaultValue=""
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="form-input"
                    />
                </div>



                <div>
                    <button onClick={() => {
                        handleLogin()
                        navigate("/")
                    }} type="submit" className="login-button">Login</button>
                </div>


                <div className="forgot-password">
                    <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
                </div>

                <div className="signup-link">
                    <p>
                        Don't have an account? <a onClick={() =>
                            navigate("/user/signup")
                        } className="signup-link-text">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    )

}

export default Login