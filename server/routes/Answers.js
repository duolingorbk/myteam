const { getAllAnswers } = require("../controller/Answers");  // Import the controller function
const express = require("express");

const answerRoute = express.Router();

answerRoute.get("/all", getAllAnswers);  // Set up a route to get all answers

module.exports = answerRoute;
