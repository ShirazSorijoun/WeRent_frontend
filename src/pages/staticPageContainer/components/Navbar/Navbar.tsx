import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import icon from '@/assets/LOGO WeRent2.jpeg';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { logout, selectIsUserAdmin, selectIsUserLoggedIn } from '@/stores/user';

export const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isAdmin = useAppSelector(selectIsUserAdmin);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="nav">
      <div className="logo">
        <img className="logo-image" loading="lazy" src={icon} alt="Logo" />
      </div>
      <div className="pages">
        <Link to="/" className="page">
          בית
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/rent" className="page">
              עיין בנכסים
            </Link>
            <Link to="/addApartment" className="page">
              הוסף נכס
            </Link>
            <Link to="/profile" className="page">
              הפרופיל שלי
            </Link>
            {isAdmin && (
              <Link to="/users" className="page">
                אזור ניהול
              </Link>
            )}
            <Link to="/documents" className="page">
              Documents
            </Link>
            <Link to="/allReviews" className="page">
              ביקורות
            </Link>
          </>
        )}
      </div>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="auth-button" onClick={handleLogout}>
            התנתק
          </div>
        ) : (
          // If user is not logged in, show login and signup buttons
          <>
            <Link to="/login" className="auth-button">
              התחבר
            </Link>
            <Link to="/signup" className="auth-button">
              הרשם
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
