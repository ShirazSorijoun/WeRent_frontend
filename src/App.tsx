import React from 'react';
import AddApartment from './components/AddApartment/addApartment';
//import Apartment from './components/Apartments/apartments';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AddApartment />
    </div>
  );
}

export default App;