require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.root,
    password: process.env.aqw,
    database: process.env.speakeasy,
    host: process.env.localhost,
    dialect: process.env.mysql, 
  },
  production: {
    username: process.env.root,
    password: process.env.aqw,
    database: process.env.speakeasy,
    host: process.env.localhost,
    dialect: process.env.mysql,
    logging: false, // Disable logging in production for better performance
  },
};
process.env.JWT_SECRET