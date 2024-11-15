// LanguageSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelector.css';

function LanguageSelector({ setLanguage }) {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    navigate('/lessons');  // Navigate to Lessons page after setting the language
  };

  return (
    <div className="language-selector">
      <button className="eng" onClick={() => handleLanguageSelect('english')}>English</button>
      <button className="fr" onClick={() => handleLanguageSelect('french')}>French</button>
      <div className="gif-container">
        <iframe  
          src="https://giphy.com/embed/tydpiqmhbBFuM" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allowFullScreen 
          title="Language Selector GIF"
        ></iframe>
      </div>
    </div>
  );
}

export default LanguageSelector;
