import React, { useEffect, useState } from 'react';
import './ThemeSelector.css';
import { useNavigate } from 'react-router-dom';

const ThemeSelector = () => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);

    // Optional: redirect to next page (e.g., location/language selection)
    setTimeout(() => {
      navigate('/languageselector');
    }, 800);
  };

  return (
    <div className="theme-selector-container">
      <h2>Select Your Theme</h2>
      <div className="theme-buttons">
        <button
          className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => handleThemeChange('light')}
        >
          🌞 Light Mode
        </button>
        <button
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => handleThemeChange('dark')}
        >
          🌙 Dark Mode
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;