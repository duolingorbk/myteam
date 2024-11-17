const {getAllLessons ,getLessons} = require("../controller/lessons")
const express = require("express")

const lessonroute = express.Router()

lessonroute.get("/all" ,getAllLessons)
lessonroute.get("/allLessons" , getLessons)


module.exports = lessonroute