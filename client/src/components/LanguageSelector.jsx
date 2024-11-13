import React from 'react';
import { useNavigate } from 'react-router-dom';

function LanguageSelector({ setLanguage }) {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    navigate('/lessons');
  };

  return (
    <div>
      <h2>Select Language</h2>
      <button onClick={() => handleLanguageSelect('english')}>English</button>
      <button onClick={() => handleLanguageSelect('french')}>French</button>
    </div>
  );
}

export default LanguageSelector;