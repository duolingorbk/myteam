import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'



import ChooseLanguage from './components/lessons pages/ChooseLanguage'

function App() {
  
   const [lessons, setlessons] = useState([]);
   

  return (
    <Routes>
      <Route path='/' element={<ChooseLanguage lessons={lessons}/>}/>
      <Route />
    </Routes>
  )
}

export default App
