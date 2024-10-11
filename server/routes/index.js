const { Router } = require("express");
const router = Router();

const SurahRoutes = require("./surahs");
const AyahRoutes = require("./ayahs");


router.use("/", SurahRoutes);
router.use("/", AyahRoutes);

module.exports = router;
