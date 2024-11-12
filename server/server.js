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
app.use(express.static(__dirname + "../react-client/index.jsx"));
app.use(express.json());

app.use('/api/auth', authRoutes);

mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
  
  );
};

const secretKey = 'your_secret_key'//this is a secret key for secret key signing


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});