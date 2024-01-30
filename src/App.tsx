import React from 'react';
import AddApartment from './components/AddApartment/addApartment';
//import Apartment from './components/Apartments/apartments';
import './App.css';
import Registration from './components/Registration/Registration';

const App: React.FC = () => {

  //const apartmentId = '65b8c6fd1f15e9e5872ac051';

  return (
    <div className="App">
      <AddApartment />
    </div>
  );
}

export default App;