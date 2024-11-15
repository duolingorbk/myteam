
const {signup,login , findAllUsers , deleteUser , updateUser} = require("../controller/user")
const express = require("express")

const userroute = express.Router()

userroute.post("/signup" , signup)
userroute.get("/allusers", findAllUsers)
userroute.delete("/deleteUser/:id" , deleteUser)
userroute.put("updateUser/:id" , updateUser)

userroute.post("/login",login)


module.exports = userroute