import React from "react";
import "./App.css";

//import AddApartment from "./components/AddApartment/addApartment";
//import ApartmentDetails from "./components/ApartmentDetails/apartmentDetails";
//import AddReview from "./components/AddReview/addReview";
//import Login from "./components/Login/login"
import UserProfile from "./components/UserProfile/userProfile"
import { BrowserRouter as Router } from "react-router-dom";
//import Registration from "./components/Registration/Registration";


const App: React.FC = () => {
  //const apartmentId = '65c254369bfa1933808ec5e1';

  return (
    <Router>
      <div className="App">
        <UserProfile/>
      </div>
    </Router>
  );
};

export default App;
