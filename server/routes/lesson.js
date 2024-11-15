const {getAllLessons} = require("../controller/lessons")
const express = require("express")

const lessonroute = express.Router()

lessonroute.get("/all/:language" ,getAllLessons)


module.exports = lessonroute