const { getAllAnswers , getAnswersByQuestion ,deleteAnswer , updateAnswer , getAnswers} = require("../controller/Answers"); 

const express = require("express");

const answerRoute = express.Router();

answerRoute.get("/all", getAllAnswers); 
answerRoute.get("/Everything" , getAnswers)
answerRoute.get("/:questionId", getAnswersByQuestion);
answerRoute.get("/all/:questionId", getAllAnswers); 
answerRoute.delete("/delete/:id", deleteAnswer);
answerRoute.put("/updateAnswer/:id", updateAnswer);

module.exports = answerRoute;
