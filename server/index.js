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
  database: "quran",
});

app.get("/", (req, res) => {
  return res.json("From backend");
});

// Fetch all surahs with pagination
app.get("/surahs", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const surahs = `SELECT * FROM surahs LIMIT ? OFFSET ?`;
  db.query(surahs, [limit, skip], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


// Fetch all ayahs
app.get("/ayahs", (req, res) => {
  const ayahs = "SELECT * FROM ayahs";
  db.query(ayahs, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Fetch ayahs for a specific surah
app.get("/surah/:id/ayahs", async (req, res) => {
  const surahId = parseInt(req.params.id, 10);

  try {
    const [rows] = await db.promise().execute(
      `
      SELECT
        id AS ayah_id,
        surah_id,
        ayah_number,
        ayah_arabic,
        ayah_english
      FROM
        ayahs
      WHERE
        surah_id = ?
      ORDER BY
        ayah_number
    `,
      [surahId]
    );

    // If no ayahs are found, return a 404 error
    if (rows.length === 0) {
      return res.status(404).json({ message: "No ayahs found for this surah" });
    }

    // Return the found ayahs
    res.json({ ayahs: rows });
  } catch (error) {
    console.error("Error fetching ayahs:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch ayah for ayahs
app.get("/ayah/:id", async (req, res) => {
  const ayahId = parseInt(req.params.id, 10);

  try {
    const [rows] = await db.promise().execute(
      `
      SELECT
        id AS ayah_id,
        surah_id,
        ayah_number,
        ayah_arabic,
        ayah_english
      FROM
        ayahs
      WHERE
        id = ?
    `,
      [ayahId]
    );

    // If no ayah is found, return a 404 error
    if (rows.length === 0) {
      return res.status(404).json({ message: "Ayah not found" });
    }

    // Return the found ayah
    res.json({ ayah: rows[0] });
  } catch (error) {
    console.error("Error fetching ayah:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
