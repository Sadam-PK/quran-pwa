const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/db");
const Routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
