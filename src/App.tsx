import React from 'react';
import Navbar from './components/Navbar/Navbar';
//import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import './App.css';
import Registration from './components/Registration/Registration';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;