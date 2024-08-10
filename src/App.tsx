import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  LandingPage,
  AddReview,
  UserPage,
  RentPropertiesPage,
  AllReviewsPage,
  LoginPage,
  RegistrationPage,
  AllUsersAdminPage,
  ApartmentDetailsPage,
  MapPage,
  StaticPageContainer,
  ApartmentPersonalAreaPage,
  PostGoogleRegister,
} from './pages';
import { NewAddApartment } from '@@/newAddApartment';
import AddApartment from '@@/AddApartment/addApartment';

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
          <Route path="/addApartment" element={<NewAddApartment />} />
          <Route path="/addApartmentOld" element={<AddApartment />} />
          <Route path="/users" element={<AllUsersAdminPage />} />
          <Route path="/rent" element={<RentPropertiesPage />} />
          <Route path="/postGoogleRegister" element={<PostGoogleRegister />} />
          <Route path="/googlemap" element={<MapPage />} />
          <Route
            path="/ApartmentPersonalArea"
            element={<ApartmentPersonalAreaPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
