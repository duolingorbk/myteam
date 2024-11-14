import React,{useEffect, useState} from 'react'
import Lessons from './Lessons';
import axios from 'axios'



//=> 
export default function ChooseLanguage() {

  const [engQuestions, setengQuestions] = useState([]);
  const [engAnswers, setengAnswers] = useState([]);

  const [frenchQuestions, setfrenchQuestions] = useState([]);
  const [frenchAnswers, setfrenchAnswers] = useState([]);
  
 
  
  console.log(frenchAnswers)

 const fetchFrenchQuestions = function () {
  axios.get("http://localhost:3000/questions/all")
    .then((res)=>{
      setfrenchQuestions(res.data)

    })
    .catch((err)=>{
      console.log("error fetching questiont from client", err);
      
    })
    return 
 }

 
 const fetchFrenchAnswers = function () {
  axios.get("http://localhost:3000/answers/all")
    .then((res)=>{
      setfrenchAnswers(res.data)

    })
    .catch((err)=>{
      console.log("error fetching questiont from client", err);
      
    })
    return 
 }
 

  useEffect(()=>{
    fetchFrenchQuestions()
    fetchFrenchAnswers()
  },[])

  
 
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

