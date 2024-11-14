const { getAllAnswers , getAnswersByQuestion } = require("../controller/Answers");  // Import the controller function
const express = require("express");

const answerRoute = express.Router();

answerRoute.get("/all", getAllAnswers);  // Set up a route to get all answers
answerRoute.get("/:questionId", getAnswersByQuestion);

answerRoute.get("/all/:questionId", getAllAnswers);  // Set up a route to get all answers

module.exports = answerRoute;
