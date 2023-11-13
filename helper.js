const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const { Parser, Builder  } = require('xml2js');
const moment = require("moment");
const xml2js = require('xml2js');



function stringToJSON(inputString) {
  // Remove the "Processed Message: " prefix
  const jsonString = inputString.replace("Processed Message: ", "");

  try {
    // Parse the JSON string into a JavaScript object
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    // Handle any parsing errors, e.g., invalid JSON
    console.error("Error parsing JSON:", error);
    return null; // Return null in case of an error
  }
}


function parseFIXMessageToJSONObject(fixMessage) {
  try {
    console.log("welcome");
  } catch (error) {}
}


function parseDBObjectToXMLFile(data) {
  try {

    const flex_status_val = {
      "": "REJ",
      "0": "ACK",
      "1": "PF",
      "2": "FILL",
      "4": "CXLD",  
      "5": "RPLD",  
      "8": "REJ",
      "C": "EXPIRED",
      "Z": "ACK",  
      "U": "UNPLD"  
  };

    const order_status_val = {
      "0": "Accepted",
      "1": "Partially Filled",
      "2": "Filled",
      "4": "Cancelled",
      "5": "Replaced",
      "8": "Rejected",
      "C": "Expired",
      "Z": "Private Order",
      "U": "Unplaced"
  };


    const xmlElements = data.map(item => ({
      $: {
        Action: flex_status_val[item.exec_type] || 'Unknown',
        Status: flex_status_val[item.order_status] || 'Unknown',
        ISIN: 'BD0637FRSL08', // Replace with your desired value
        AssetClass: 'EQ',
        OrderID: item.orderid, // Use the corresponding parameter from your database
        RefOrderID: item.reforderid, // Use the corresponding parameter from your database
        Side: item.order_side === 1 ? "S" : item.order_side === 2 ? "B" : "-",  // Use the corresponding parameter from your database
        BOID: item.client_bo, // Use the corresponding parameter from your database
        SecurityCode: item.order_symbol, // Use the corresponding parameter from your database
        
        Date:  moment(item.exch_time, "YYYYMMDD").format("YYYYMMDD"),
        Time:  moment(item.exch_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss"),
        Quantity: item.order_qty, // Use the corresponding parameter from your database
        Price: item.order_rate, // Use the corresponding parameter from your database
        Value: item.order_qty * item.order_rate, // Calculate the value
        ExecID: item.engineid, // Use the corresponding parameter from your database
        Session: 'CONTINIOUS', // Replace with your desired value
        FillType = item.order_status === '1' && item.exec_type === 'F' ? 'PF' : '-',
        Category: 'A', // Replace with your desired value
        CompulsorySpot: 'N', // Replace with your desired value
        ClientCode: item.client_bo, // Use the corresponding parameter from your database
        TraderDealerID: item.broker_workstation_id, // Replace with your desired value
        OwnerDealerID: 'UFTTRDR020', // Replace with your desired value
        TradeReportType: '-', // Replace with your desired value
        board: item.board_type, // Use the corresponding parameter from your database
      },
    }));

    // Define the data object to convert to XML
    const xmlData = {
      Trades: {
        Detail: xmlElements,
      },
    };
    
    

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(xmlData);
    

    // Write XML to a file
    fs.writeFileSync('data.xml', xml);
    console.log('XML file saved.');
  } catch (ex) {
    console.error(ex);
  }
}


//export modules.......
module.exports = {
  stringToJSON,
  parseFIXMessageToJSONObject,
 // ConnctingToDatabase,
  parseDBObjectToXMLFile,
};

