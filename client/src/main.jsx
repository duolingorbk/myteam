import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./css/interface.css"
import "./css/Lessons.css"
// import App from './App.jsx'
// import AdminInterface from './components/admin/MainInterface.jsx'
import Lessons from './components/admin/Lessons.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AdminInterface/> */}
    {/* <Languages/>  */}
     <Lessons/>
    
  </StrictMode>
)
