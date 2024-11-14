const { getAllAnswers , getAnswersByQuestion } = require("../controller/Answers"); 
const express = require("express");

const answerRoute = express.Router();

answerRoute.get("/all", getAllAnswers); 
answerRoute.get("/:questionId", getAnswersByQuestion);

answerRoute.get("/all/:questionId", getAllAnswers); 

module.exports = answerRoute;
