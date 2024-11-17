import React from 'react';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LanguageSelector.css';

function LanguageSelector({ setLanguage }) {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    navigate('/lessons');
  };

  return (
    <div className="language-selector">
      <h2>Select a Language</h2>
      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<span>🇬🇧</span>}
          onClick={() => handleLanguageSelect('english')}
        >
          English
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<span>🇫🇷</span>}
          onClick={() => handleLanguageSelect('french')}
        >
          French
        </Button>
      </Stack>
    </div>
  );
}

export default LanguageSelector;
