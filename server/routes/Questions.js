const { getAllQuestions } = require("../controller/Questions");  // Fix controller path and name
const express = require("express");

const questionRoute = express.Router();  // Renaming to reflect the content, not lessons

questionRoute.get("/all", getAllQuestions);  // Correctly map to getAllQuestions

module.exports = questionRoute;
