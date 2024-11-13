const {signup,login,verifyToken,logout} = require("../controller/user")
const express = require("express")

const userroute = express.Router()

userroute.post("/signup" , signup)
userroute.post("/login",login)


module.exports = userroute