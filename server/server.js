const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
require("./database/index")
const PORT = 3000;
const userroute = require("./routes/user")
const lessonroute = require("./routes/lesson")
app.use("/user" , userroute)

app.use("/lesson" , lessonroute)






app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});