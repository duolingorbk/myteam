const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const  routeLessons=require("./routes/lessonsAndQ/lessonsrouter.js")
const  routeQuestions=require("./routes/lessonsAndQ/questions.js")
const  routeAnswers=require("./routes/lessonsAndQ/answers.js")
app.use(cors());
app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use(express.json());


app.use('/Lessons',routeLessons)
app.use('/Questions',routeQuestions)
app.use('/Answers',routeAnswers)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});