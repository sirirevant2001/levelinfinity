import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css"; // Reusing the same CSS as the signup page

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/customers/login", loginData);
      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("userName", response.data.name); // Store the user's name in localStorage
        // navigate("/"); // Redirect to home page or dashboard
        window.location.href = "/";
        

      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        console.error("Error during login:", error);
        alert("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <h1 className="signup-title">LOGIN</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">LOGIN</button>
        </form>
        <div className="navbar-section navbar-icons">
          <p style={{ margin: "15px" }}>Don't have an account?</p>
          <Link to="/signup" style={{ marginTop: "17.5px", marginLeft: "5px" }} className="nav-link">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
