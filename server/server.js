const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authRoutes = require('./routes/signup_and_login_routes/auth');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
require("./database/index")
const userroute = require("./routes/user")
const lessonroute = require("./routes/lesson")
app.use("/user" , userroute)

app.use("/lesson" , lessonroute)







app.use('/Lessons',routeLessons)
app.use('/Questions',routeQuestions)
app.use('/Answers',routeAnswers)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});