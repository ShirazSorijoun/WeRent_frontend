import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  MapPage,
  StaticPageContainer,
} from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaticPageContainer />}>
          <Route index element={<LandingPage />} />
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
          <Route path="/googlemap" element={<MapPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
