import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import CreateLesson from './components/admin/CreateLessons.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <CreateLesson/> */}
    <App />
  </StrictMode>
)
