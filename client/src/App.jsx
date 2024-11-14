import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import Lessons from './components/Lessons.jsx';
import Questions from './components/Questions';
import Signup from "./components/signup/Signup.jsx"
import Login from "./components/signup/Login.jsx"

import './App.css';
function App() {
  const [language, setLanguage] = useState(null);  // Track selected language

  return (
<div>
  
</div>
  );
}

export default App;