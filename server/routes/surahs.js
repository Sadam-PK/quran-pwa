const {Router} = require("express")
const router = Router();
const db = require('../config/db')
// Fetch all surahs with pagination
router.get("/surahs", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
  
    const surahs = `SELECT * FROM surahs LIMIT ? OFFSET ?`;
    db.query(surahs, [limit, skip], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });


  // Fetch ayahs for a specific surah
router.get("/surah/:id/ayahs", async (req, res) => {
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

module.exports = router;