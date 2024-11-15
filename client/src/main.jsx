import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
// import App from './App.jsx'
// import Lessons from './components/lessons pages/Lessons.jsx'
import Questions from './components/Questions.jsx'
// import Questions from './components/Questions.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <App /> */}
    {/* <Lessons /> */}
    <Questions />
    </BrowserRouter>
  </StrictMode>,
)
