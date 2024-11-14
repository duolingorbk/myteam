const {signup,login,checkEmail} = require("../controller/user")
const express = require("express")

const userroute = express.Router()

userroute.post("/signup" , signup)
userroute.post("/checkemail",checkEmail)
userroute.post("/login",login)


module.exports = userroute