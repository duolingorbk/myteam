const createLesson = require("../controller/admin")
const express = require("express")

const admincreateroute = express.Router()

admincreateroute.post("/createlesson" ,createLesson)


module.exports = admincreateroute