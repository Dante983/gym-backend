const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.password,
  database: process.env.database,
});

module.exports = con;
