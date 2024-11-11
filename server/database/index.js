const mysql = require("mysql2");
const mysqlConfig = require("./config");

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  err ? console.error(err) : console.log("connected db");
});
module.exports= connection