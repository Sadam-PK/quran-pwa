const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root123?",
  database: "sql_hr",
});

app.get("/", (req, res) => {
  return res.json("From backend");
});

app.get("/hr", (req, res) => {
  const employees = "SELECT * FROM employees";
  db.query(employees, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("listening");
});
