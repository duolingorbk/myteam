const { getAllQuestions , getQuestionsByLessonId} = require("../controller/Questions");  
const express = require("express");

const questionRoute = express.Router(); 

questionRoute.get("/all", getAllQuestions);  
questionRoute.get("/all/:lessonId", getQuestionsByLessonId);  

module.exports = questionRoute;

