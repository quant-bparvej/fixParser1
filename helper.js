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

 


  const xmlElements = data.map(item => {
    let flex_status = "-";
  
    if (item.exec_type === "") {
      flex_status = flex_status_val[item.exec_type];
    } else if (item.exec_type === "4") {
      flex_status = flex_status_val[item.exec_type];
    } else if (item.exec_type === "5") {
      flex_status = flex_status_val[item.exec_type];
    } else {
      flex_status = flex_status_val[item.order_status];
    }
  
    return {
      $: {
        Action: "EXEC",
        Status: flex_status ,
        ISIN: 'BD0637FRSL08', // Replace with your desired value
        AssetClass: 'EQ',
        OrderID: item.orderid, // Use the corresponding parameter from your database
        RefOrderID: item.reforderid, // Use the corresponding parameter from your database
        Side: item.order_side === 1 ? "S" : item.order_side === 2 ? "B" : "-",  
        BOID: item.client_bo, 
        SecurityCode: item.order_symbol,
        Date: moment(item.exch_time, "YYYYMMDD").format("YYYYMMDD"),
        Time: moment(item.exch_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss"),
        Quantity: item.last_qty, 
        Price: item.last_px,
        Value: item.last_qty * item.last_px, 
        ExecID: item.engineid,
        Session: 'CONTINUOUS', // You might want to adjust this based on your logic
        FillType: item.order_status === '1' && item.exec_type === 'F' ? 'PF' : '-',
        Category: 'A', 
        CompulsorySpot: 'N', 
        ClientCode: item.client_bo, 
        TraderDealerID: item.broker_workstation_id, 
        OwnerDealerID: 'UFTTRDR020', 
        TradeReportType: '-',
        board: item.board_type,
      },
    };
  });
  
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

