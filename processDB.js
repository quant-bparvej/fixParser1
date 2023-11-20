const sqlite3 = require("sqlite3");
const { Op } = require("sequelize");
//const Log = require("./models/Logs"); // Adjust the path as needed
const FixMessage = require('./models/FixMessage'); // Adjust the path as needed
const db = require('./db/connectionSQLite');
const moment = require('moment-timezone');
const notifier = require('node-notifier');
const momentJS = require('moment');
require('dotenv').config();
//import {parseDBOjectToXMLFile} from './helper';



const CHUNK_SIZE = process.env.CHUNK_SIZE;

async function parseFIXMessagesandInsertTOMysql() {
  try {
    //console.log('Start Time:', new Date());
    let startTime = new Date();
    const todayDate = momentJS().format('YYYY-MM-DD');

    let offset = 0;
    let insertCount = 0;
    const format = 'YYYYMMDD-ZHH:mm:ss.SSS';
    
    const query =
    "SELECT * FROM logs WHERE prog='fix_engine' and msg like 'Processed Message:%' AND msg NOT LIKE '%Received FIX MSG:%' and msg NOT NULL";

  //     const query = `
  //   SELECT * FROM logs 
  //   WHERE prog='fix_engine' 
  //   AND msg LIKE 'Processed Message:%' 
  //   AND msg NOT LIKE '%Received FIX MSG:%' 
  //   AND msg IS NOT NULL 
  //   AND ldate='${todayDate}'
  // `;


    console.log(query);
    while(true){
      const rows = await fetchDataChunk(db, query, offset, CHUNK_SIZE);
      if (rows.length === 0) {
        // No more data to process, break out of the loop
        console.log('No data found');
        break;
      }
      else{
        console.log("data fetched: "+rows.length+ "\n");
        for (const row of rows) {
          const msgData = row.msg; // Get the data from the msg column
          
          const messageData = JSON.parse(row.msg.replace('Processed Message: {', '{'));
          const parsedDateTime = moment.tz(messageData.exch_time, format, 'UTC');
          messageData.exch_time = parsedDateTime.format('YYYY-MM-DD HH:mm:ss.SSS');

      
          // Insert the data into the destination database (FixMessage table)
          try {
            await FixMessage.create(messageData);
            insertCount++;
            console.log('Data inserted batch number:', insertCount);
          } catch (error) {
            console.error('Error inserting data:', error);
          }
        }
        //console.log('........................................................................................');
      }
      offset += parseInt(CHUNK_SIZE, 10);
    } 
    
    //   db.all(query, [], (err, rows) => {
    //   if (err) {
    //     console.error("Error executing query:", err.message);
    //   } else {
    //     //console.log("Query result:", rows);
    //     rows.forEach((row) => {
    //       const msgData = row.msg; // Get the data from the msg column
    //       const messageData = JSON.parse(
    //         row.msg.replace("Processed Message: {", "{")
    //       );
    //       // console.log(
    //       //   "Message Data:",
    //       //   JSON.stringify(messageData.trade_date, null, 2) + "\n"
    //       // );
    //       // Create a new FixMessage record with the parsed messageData
    //       FixMessage.create(messageData)
    //         .then((newFixMessage) => {
    //           console.log(
    //             "New FixMessage record created:",
    //             newFixMessage.toJSON()
    //           );
    //         })
    //         .catch((error) => {
    //           console.error("Error creating FixMessage record:", error);
    //         });
    //     });
    //   }
    // });

    //closing db

   



    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed");
        console.log('Ending Time:', new Date());
        console.log('it was started at: ', startTime);
        notifier.notify({
          title: 'Process Ended',
          message: 'Hello, this is a pop-up message!',
        });


      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return true;
}

async function fetchDataChunk(db, query, offset, limit) {
  return new Promise((resolve, reject) => {
    const queryWithLimit = `${query} LIMIT ${limit} OFFSET ${offset}`;
    //console.log("Generated SQL query:", queryWithLimit);
    db.all(queryWithLimit, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

parseFIXMessagesandInsertTOMysql();
