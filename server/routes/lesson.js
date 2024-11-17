const {getAllLessons , getLessons } = require("../controller/lessons")

const express = require("express")

const lessonroute = express.Router()
lessonroute.get("/allLessons" , getLessons)
lessonroute.get("/all/:language" ,getAllLessons)
lessonroute.get("/all" ,getAllLessons)


module.exports = lessonroute