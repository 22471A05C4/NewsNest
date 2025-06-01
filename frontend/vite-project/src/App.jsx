import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationForm from "./components/register";


import "./App.css";
import Signin from './components/Signin';

const Home = ({ onRegister, hasData }) => {
  const navigate = useNavigate();

  return (
    <div>
      <RegistrationForm onSubmitSuccess={onRegister} />
      <button
        onClick={() => navigate('/signin')}
        disabled={!hasData}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: hasData ? 'pointer' : 'not-allowed',
          backgroundColor: hasData ? '#007bff' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Sign In
      </button>
    </div>
  );
};

const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [hasData, setHasData] = useState(false);

  // Called after successful registration
  const handleFormSubmit = () => {
    alert("Registeres Successfully")
    setHasData(true);
    
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onRegister={handleFormSubmit} hasData={hasData} />} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </Router>
    
  );
};

export default App;














