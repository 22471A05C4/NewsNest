import React from 'react';
import './LanguageSelector.css';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'Telugu' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ta', label: 'Tamil' },
];

const LanguageSelector = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode) => {
    localStorage.setItem('preferredLanguage', languageCode);
    navigate('/locationselector');
  };

  return (
    <div className="language-selector-container">
      <h1 className="language-selector-title">Select your preferred language</h1>
      <div className="language-cards">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className="language-card"
            onClick={() => handleLanguageSelect(lang.code)}
          >
            {lang.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
