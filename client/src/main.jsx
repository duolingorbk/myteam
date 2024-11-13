import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./css/interface.css"
import "./css/Languages.css"
import "./css/lessons.css"
// import App from './App.jsx'
// import AdminInterface from './components/admin/MainInterface.jsx'
// import Languages from './components/admin/languages.jsx'
import Lessons from './components/admin/Courses.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AdminInterface/> */}
    {/* <Languages/>  */}
  <Lessons/>
    
  </StrictMode>
)
