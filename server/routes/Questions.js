const { getAllQuestions , getQuestionsByLessonId , getQuestionsAndAnswersByLessonId , deleteQuestion , updateQuestion} = require("../controller/Questions");  
const express = require("express");

const questionRoute = express.Router(); 

questionRoute.get("/all", getAllQuestions);  
questionRoute.get("/all/:lessonId", getQuestionsByLessonId);  
questionRoute.get("/everything/:lessonId" , getQuestionsAndAnswersByLessonId)
questionRoute.delete("/delete/:id", deleteQuestion);
questionRoute.put("/updatequestion/:id", updateQuestion);



module.exports = questionRoute;

