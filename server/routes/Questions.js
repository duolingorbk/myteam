const { getAllQuestions , getQuestionsByLessonId , getQuestionsAndAnswersByLessonId , deleteQuestion} = require("../controller/Questions");  
const express = require("express");

const questionRoute = express.Router(); 

questionRoute.get("/all", getAllQuestions);  
questionRoute.get("/all/:lessonId", getQuestionsByLessonId);  
questionRoute.get("/everything/:lessonId" , getQuestionsAndAnswersByLessonId)
questionRoute.delete("/delete/:id", deleteQuestion);


module.exports = questionRoute;

