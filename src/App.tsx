import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from "./components/Reviews/reviews";
import Login from "./components/Login/login";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import SignUpPage from "./components/Registration/Registration";
import UserPage from "./pages/UserPage/userPage";
import AddApartmentPage from "./pages/AddApartmentPage/addApartmentPage";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./components/Navbar/authContext";
import ApartmentDetails from "./components/ApartmentDetails/apartmentDetails";
import AllUsersAdmin from "./components/AdminPrivate/users";
import ApartmentCard from "./components/ApartmentCard/ApartmentCard";
import RentPropertiesPage from "./pages/RentPropertiesPage/RentPropertiesPage";


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apartment-details/:apartmentId" element={<ApartmentDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/addApartment" element={<AddApartmentPage />} /> 
            <Route path="/users" element={<AllUsersAdmin />} />
            <Route path="/rent" element={<RentPropertiesPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
