const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Nikolasavic61",
  database: "laravel",
});

module.exports = con;
