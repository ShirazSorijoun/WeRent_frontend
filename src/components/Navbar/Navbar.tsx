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