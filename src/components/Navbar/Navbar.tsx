/*
import React from 'react';
import Button from '@mui/material/Button';
import './Navbar.css';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
    <div className="auth-buttons">
      <Button variant="contained" color="primary" className="login-btn">
        Login
      </Button>
      <Button variant="contained" color="secondary" className="signup-btn">
        Sign Up
      </Button>
    </div>
  </nav>
  );
};

export default Navbar;
*/



import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <div className="page">Home</div>
        <div className="page">Rent</div>
        <div className="page">Profile</div>
        <div className="page">Contact Us</div>
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="auth-button" onClick={() => setIsLoggedIn(false)}>
            Logout
          </div>
        ) : (
          <>
            <div className="auth-button">Login</div>
            <div className="auth-button">Sign up</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;



