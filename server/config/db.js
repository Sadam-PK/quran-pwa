const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Root123?",
  database: process.env.DB_NAME || "quran",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

module.exports = db;
