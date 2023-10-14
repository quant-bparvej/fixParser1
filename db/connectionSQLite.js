const sqlite3 = require("sqlite3");
require('dotenv').config();

const db = new sqlite3.Database(
  process.env.DB_FILE_PAtH,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
      return false;
    } else {
      console.log("Database opened");
    }
    //return db;
  }
);

module.exports = db;
