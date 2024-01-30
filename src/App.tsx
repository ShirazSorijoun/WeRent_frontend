import React from 'react';
//import AddApartment from './components/AddApartment/addApartment';
//import Apartment from './components/Apartments/apartments';
//import Apartment from './components/Apartments/apartmentDetails.tsx';
//import addReview from"./components/AddReview/addReview"
import Reviews from"./components/Reviews/reviews"



import './App.css';

const App: React.FC = () => {

  //const apartmentId = '65b8c6fd1f15e9e5872ac051';

  return (
    <div className="App">
      <Reviews />
    </div>
  );
}

export default App;