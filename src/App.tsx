import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './components/Navbar/authContext';
import RestAPI from './components/RestAPI/api';
import {
  LandingPage,
  AddReview,
  UserPage,
  AddApartmentPage,
  RentPropertiesPage,
  AllReviewsPage,
  LoginPage,
  RegistrationPage,
  AllUsersAdminPage,
  ChangePassword,
  ApartmentDetailsPage,
} from './pages';

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
              element={<ApartmentDetailsPage />}
            />
            <Route path="/allReviews" element={<AllReviewsPage />} />
            <Route path="/addreview" element={<AddReview />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/addApartment" element={<AddApartmentPage />} />
            <Route path="/users" element={<AllUsersAdminPage />} />
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
