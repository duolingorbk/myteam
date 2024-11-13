const {getAllLessons} = require("../controller/lessons")
const express = require("express")

const lessonroute = express.Router()

lessonroute.get("/all" ,getAllLessons)


module.exports = lessonroute