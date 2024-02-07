import React from "react";
import "./App.css";

//import AddApartment from "./components/AddApartment/addApartment";
//import ApartmentDetails from "./components/ApartmentDetails/apartmentDetails";
//import AddReview from "./components/AddReview/addReview";
//import Login from "./components/Login/login"
//import Registration from "./components/Registration/Registration";
import { BrowserRouter as Router} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  //const apartmentId = '65c254369bfa1933808ec5e1';

  return (
    <Router>
      <div className="App">
        <LandingPage />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
