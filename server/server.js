const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});