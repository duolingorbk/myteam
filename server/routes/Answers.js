const { getAllAnswers , getAnswersByQuestion } = require("../controller/Answers");  // Import the controller function
const express = require("express");

const answerRoute = express.Router();

answerRoute.get("/all", getAllAnswers);  // Set up a route to get all answers
answerRoute.get("/:questionId", getAnswersByQuestion);


module.exports = answerRoute;
