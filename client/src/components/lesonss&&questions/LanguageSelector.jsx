import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelector.css'; // Import the updated CSS file

function LanguageSelector({ setLanguage }) {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    navigate('/lessons');
  };

  return (
    <div className="language-selector">
      <h2>Select Language</h2>
      <div className="language-buttons">
        <button
          className="btn btn-english"
          onClick={() => handleLanguageSelect('english')}
        >
          <span role="img" aria-label="english">🇬🇧</span> English
        </button>
        <button
          className="btn btn-french"
          onClick={() => handleLanguageSelect('french')}
        >
          <span role="img" aria-label="french">🇫🇷</span> French
        </button>
      </div>
    </div>
  );
}

export default LanguageSelector;
