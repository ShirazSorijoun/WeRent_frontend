import React from 'react';
import Navbar from './components/Navbar/Navbar';
//import HomePage from './pages/HomePage/HomePage';
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