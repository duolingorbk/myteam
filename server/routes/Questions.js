const { getAllQuestions , getQuestionsByLessonId} = require("../controller/Questions");  // Fix controller path and name
const {getQuestionsByLessonId } = require("../controller/Questions");  // Fix controller path and name
const express = require("express");

const questionRoute = express.Router();  // Renaming to reflect the content, not lessons

questionRoute.get("/all", getAllQuestions);  // Correctly map to getAllQuestions
questionRoute.get("/:lessonId", getQuestionsByLessonId);
questionRoute.get("/all/:lessonId", getQuestionsByLessonId);  // Correctly map to getAllQuestions

module.exports = questionRoute;

