const {signup,login,verifyToken,logout} = require("../controller/user")
const express = require("express")

const userroute = express.Router()

userroute.post("/signup" , signup)
userroute.post("/login",login)
userroute.post("/logout",verifyToken,logout)


module.exports = userroute