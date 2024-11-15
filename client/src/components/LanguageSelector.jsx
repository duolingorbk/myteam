import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css'
function LanguageSelector({ setLanguage }) {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    navigate('/lessons');
  };

  return (
    <div>
      <h2>Select Language</h2>
      <button  className ="eng"onClick={() => handleLanguageSelect('english')}>English</button>
      <button   className='fr' onClick={() => handleLanguageSelect('french')}>French</button>
    </div>
  );
}

export default LanguageSelector;