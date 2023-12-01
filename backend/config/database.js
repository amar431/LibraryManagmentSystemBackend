const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "amma@431",
  database: "library_management_system",
  
});

module.exports = connection;
