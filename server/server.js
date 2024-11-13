const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
require("./database/index")
const PORT = process.env.PORT || 3000;
const userroute = require("./routes/user")
const lessonroute = require("./routes/lesson")

app.use("/user" , userroute)

app.use("/lesson" , lessonroute)



app.get('/', (req, res) => {
  res.send('Hello, World!');
});



//app.use('/Lessons',routeLessons)
//app.use('/Questions',routeQuestions)
//app.use('/Answers',routeAnswers)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});