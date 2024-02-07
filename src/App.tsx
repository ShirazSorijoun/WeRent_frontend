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

const App: React.FC = () => {
  //const apartmentId = '65c254369bfa1933808ec5e1';

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<SignUpPage/>} />
          <Route path="/profile" element={<UserPage/>} />
          <Route path="/addApartment" element={<AddApartmentPage/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
