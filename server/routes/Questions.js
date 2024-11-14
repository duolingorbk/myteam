const {getQuestionsByLessonId } = require("../controller/Questions");  // Fix controller path and name
const express = require("express");

const questionRoute = express.Router();  // Renaming to reflect the content, not lessons

questionRoute.get("/all/:lessonId", getQuestionsByLessonId);  // Correctly map to getAllQuestions

module.exports = questionRoute;
