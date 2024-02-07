import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (localStorage.getItem("accessToken") !== null
      && localStorage.getItem("refreshToken") !== null
      && localStorage.getItem("userId") !== null)
    setIsLoggedIn(true);

    console.log("User logged in (Navbar)");
  };


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    console.log("User logged out");
    setIsLoggedIn(false);
  };


  return (
    <div className="nav">
      <div className="logo">
        <img
          className="logo-image"
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/558c225b22f6ca9794d5a1e7ed80500bb2f1567d453a4a0817759fd3263cff87?apiKey=0a183be08c194c808182f759b68acaaf&"
          alt="Logo"
        />
        Fix<span style={{ color: "rgba(242,153,74,1)" }}>N</span>Drive.
      </div>
      <div className="pages">
        <Link to="/" className="page">
          Home
        </Link>
        <Link to="/rent" className="page">
          Rent
        </Link>
        <Link to="/profile" className="page">
          Profile
        </Link>
        <Link to="/contact" className="page">
          Contact Us
        </Link>
      </div>



      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="auth-button" onClick={handleLogout}>
            Logout
          </div>
        ) : (
          // If user is not logged in, show login and signup buttons
          <>
            <Link to="/login" className="auth-button" onClick={handleLogin}>
              Login
            </Link>
            <Link to="/signup" className="auth-button">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
