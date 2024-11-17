const {getAllLessons,getLessonsByLevel , getLessons } = require("../controller/lessons")
const express = require("express")

const lessonroute = express.Router()

lessonroute.get("/all/:language" ,getAllLessons)
lessonroute.get("/all" ,getAllLessons)
lessonroute.get("/level/:levelId" ,getLessonsByLevel)
lessonroute.get("/allLessons" , getLessons)

module.exports = lessonroute