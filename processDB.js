const sqlite3 = require("sqlite3");
const { Op } = require("sequelize");
const Log = require("./models/Logs"); // Adjust the path as needed
const FixMessage = require('./models/FixMessage'); // Adjust the path as needed


async function ConnctingToDatabase() {
  try {
    const db = await new sqlite3.Database(
      "SYNOSYSLOGDB_192.168.155.11.DB",
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

    const query =
      "SELECT * FROM logs WHERE prog='fix_engine' and msg like 'Processed Message:%' AND msg NOT LIKE '%Received FIX MSG:%' LIMIT 1000";
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err.message);
      } else {
        //console.log("Query result:", rows);
        rows.forEach((row) => {
          const msgData = row.msg; // Get the data from the msg column
          const messageData = JSON.parse(
            row.msg.replace("Processed Message: {", "{")
          );
          console.log(
            "Message Data:",
            JSON.stringify(messageData.trade_date, null, 2) + "\n"
          );
          // Create a new FixMessage record with the parsed messageData
          FixMessage.create(messageData)
            .then((newFixMessage) => {
              console.log(
                "New FixMessage record created:",
                newFixMessage.toJSON()
              );
            })
            .catch((error) => {
              console.error("Error creating FixMessage record:", error);
            });
        });
      }
    });

    //closing db
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed");
      }
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
  return true;
}

async function insertToDB(fixMessageObjetct) {
  try {
  } catch (ex) {
    console.log(ex);
  }
}

ConnctingToDatabase();
