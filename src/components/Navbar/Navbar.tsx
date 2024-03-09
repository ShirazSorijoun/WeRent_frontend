import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./authContext";
import { UserRole } from "../../services/user-service";

function Navbar() {
  const { isLoggedIn, logout, roles } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="nav">
      <div className="logo">
        <img
          className="logo-image"
          loading="lazy"
          src="src/assets/LOGO WeRent2.jpeg"
          alt="Logo"
        />
      </div>
      <div className="pages">
        <Link to="/" className="page">
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/rent" className="page">
            Rent properties
          </Link>
        )}
        {isLoggedIn && roles === UserRole.Owner && (
          <Link to="/addApartment" className="page">
            Add apartment
          </Link>
        )}
        {isLoggedIn && roles !== UserRole.Admin && (
          <Link to="/profile" className="page">
            Profile
          </Link>
        )}
        {isLoggedIn && roles == UserRole.Admin && (
          <Link to="/users" className="page">
            Private Area
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/allReviews" className="page">
            Reviews
          </Link>
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
}

export default Navbar;
