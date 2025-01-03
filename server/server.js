const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
require("./database/index.js")
const PORT = 3000;
const userroute = require("./routes/user")
const lessonroute = require("./routes/lesson")
const questionroute = require("./routes/Questions")
const answersroute = require("./routes/Answers")
const admincreateroute=require("./routes/admin")

app.use("/user" , userroute)
app.use("/lesson" , lessonroute)
app.use("/questions" , questionroute)
app.use("/Answers" ,answersroute )
app.use("/admin",admincreateroute)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});