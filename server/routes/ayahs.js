const { Router } = require("express");
const router = Router();
const db = require('../config/db')
// Fetch all ayahs
router.get("/ayahs", (req, res) => {
  const ayahs = "SELECT * FROM ayahs";
  db.query(ayahs, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Fetch ayah for ayahs
router.get("/ayah/:id", async (req, res) => {
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

module.exports = router;
