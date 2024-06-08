import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/login';
import LandingPage from './pages/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './components/Registration/Registration';
import UserPage from './pages/UserPage/userPage';
import AddApartmentPage from './pages/AddApartmentPage/addApartmentPage';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './components/Navbar/authContext';
import ApartmentDetails from './components/ApartmentDetails/apartmentDetails';
import AllUsersAdmin from './components/AdminPrivate/users';
import RentPropertiesPage from './pages/RentPropertiesPage/RentPropertiesPage';
import ChangePassword from './components/ChangePassword/afterSignupGoogle';
import AddReview from './components/AddReview/addReview';
import AllReviews from './pages/AllReviewsPage/AllReviewsPage';
import RestAPI from './components/RestAPI/api';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/apartment-details/:apartmentId"
              element={<ApartmentDetails />}
            />
            <Route path="/allReviews" element={<AllReviews />} />
            <Route path="/addreview" element={<AddReview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/addApartment" element={<AddApartmentPage />} />
            <Route path="/users" element={<AllUsersAdmin />} />
            <Route path="/rent" element={<RentPropertiesPage />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/googlemap" element={<RestAPI />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
