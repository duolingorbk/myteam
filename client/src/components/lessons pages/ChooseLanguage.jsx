import React,{useState} from 'react'
import Lessons from './Lessons';


//=>  
export default function ChooseLanguage({lessons}) {

  const [engQuestions, setengQuestions] = useState([]);
  const [frenchQuestions, setfrenchQuestions] = useState([]);
  const [engAnswers, setengAnswers] = useState([]);
  const [frenchAnswers, setfrenchAnswers] = useState([]);
  



  
 
  return (
    <div>
      <div className='eng-lessons' onClick={()=>{

      }}>
         Learn English
      </div>

      <div className='french-lessons' onClick={()=>{

      }}>
         Learn French
      </div>
    </div>
  )
}

