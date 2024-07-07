import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import icon from '@/assets/LOGO WeRent2.jpeg';
import { UserRole } from '@/models';
import React from 'react';
import { useAuth } from '@/common/hooks';

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout, roles } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="nav">
      <div className="logo">
        <img className="logo-image" loading="lazy" src={icon} alt="Logo" />
      </div>
      <div className="pages">
        <Link to="/" className="page">
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/rent" className="page">
              Rent properties
            </Link>
            {roles === UserRole.Owner && (
              <Link to="/addApartment" className="page">
                Add apartment
              </Link>
            )}
            {roles !== UserRole.Admin && (
              <Link to="/profile" className="page">
                Profile
              </Link>
            )}
            {roles == UserRole.Admin && (
              <Link to="/users" className="page">
                Private Area
              </Link>
            )}
            <Link to="/allReviews" className="page">
              Reviews
            </Link>
          </>
        )}
      </div>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="auth-button" onClick={handleLogout}>
            Logout
          </div>
        ) : (
          // If user is not logged in, show login and signup buttons
          <>
            <Link to="/login" className="auth-button">
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
};
