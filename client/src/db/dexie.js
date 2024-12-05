// frontend/src/db/dexie.js
import Dexie from "dexie";

// Defines Dexie database
const db = new Dexie("MyDatabase");
db.version(1).stores({
  surahs: "++id, id, name, meaning, ayahs" // schema
  // Add more tables as needed
});

export default db;
