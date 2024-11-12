const signup = require("../controller/user")
const express = require("express")

const userroute = express.Router()

userroute.post("/signup" , signup)



module.exports = userroute