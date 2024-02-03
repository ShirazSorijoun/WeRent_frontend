import React from "react";
import "./App.css";
import Registration from "./components/Registration/Registration";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  //const apartmentId = '65b8c6fd1f15e9e5872ac051';

  return (
    <Router>
      <div className="App">
        <Registration />
      </div>
    </Router>
  );
};

export default App;
