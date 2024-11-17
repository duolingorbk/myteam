const express = require("express");
const createLesson = require("../controller/admin"); 

const admincreateroute = express.Router();

admincreateroute.post("/createlesson", createLesson);

module.exports = admincreateroute;
