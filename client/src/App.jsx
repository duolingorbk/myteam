import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from "./components/signup/Signup.jsx"
import Login from './components/signup/Login.jsx'
import Logout from './components/signup/Logout.jsx'

import './App.css'

function App() {
 

  return (
    <>
       <BrowserRouter>
      <Routes>
        
        <Route path="/user/signup" element={<Signup />}/>
          <Route path="/user/login" element={<Login/>} />
        
      
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
