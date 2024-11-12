const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;


const userRouter = require("./routes/adminUserRoute")


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use("/api",userRouter)


















app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});