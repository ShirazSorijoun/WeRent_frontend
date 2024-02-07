import React from "react";
import "./App.css";

import UserPage from "./pages/UserPage/userPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AddApartmentPage from "./pages/AddApartmentPage/addApartmentPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/addapartment" element={<AddApartmentPage />} />
      </Routes>
    </Router>
  );
};
