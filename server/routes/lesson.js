const {getAlllessons} = require("../controller/lessons")
const express = require("express")

const lessonroute = express.Router()

lessonroute.get("/all" ,getAlllessons )


module.exports = lessonroute