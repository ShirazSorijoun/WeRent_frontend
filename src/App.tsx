import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;