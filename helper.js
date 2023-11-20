const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const { Parser, Builder } = require('xml2js');
const moment = require("moment");
const xml2js = require('xml2js');
const ClientsActive = require('./models/ClientsActive');
const DseMdSymbol = require('./models/DseMdSymbol');
const sequelize = require('./db/connectionPostgreSQL');
const sequelizeMarketDB = require('./db/connectionPostgreSQLMarketDB');



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
  } catch (error) { }
}


async function parseDBObjectToXMLFile(data) {
  try {

    const boidToClientCodeAndDealerIdMap = await getClientData();
    const symbolsToOthersMap = await getSymbolData();

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

    const actionStatusVal = {
      "0": "NEW",
      "8": "RPLREQ",
      "2":"EXEC",
      "1": "EXEC",


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

      let order_status = "EXEC";
      switch (item.order_status) {
        case "0":
          order_status = "NEW";
          break;
        case "4":
          order_status = "CXLREQ";
          break;
        case "0":
          if (item.exec_type == "5") {
            order_status = "RPLREQ";
          }
          break;
        default:
          order_status = "EXEC";
          break;  
        // Add additional cases as needed
      }

       /// counting the session
    const startTime = moment('10:00:00', 'HH:mm:ss');
    const endTime = moment('14:30:00', 'HH:mm:ss');
    const orderTime = moment(item.exch_time, 'YYYY-MM-DD HH:mm:ss');

    const sessionType = orderTime.isBetween(startTime, endTime) ? 'CONTINUOUS' : 'CLOSED';



      return {
        $: {
          Action: order_status,
          Status: flex_status,
          ISIN: symbolsToOthersMap.get(item.order_symbol)?.isin ?? "-", // Replace with your desired value
          AssetClass: symbolsToOthersMap.get(item.order_symbol)?.symbol_instr ?? "-",
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
          Session: sessionType, // You might want to adjust this based on your logic
          FillType: item.order_status === '1' && item.exec_type === 'F' ? 'PF' : '-',
          Category: symbolsToOthersMap.get(item.order_symbol)?.symbol_category ?? "-",
          CompulsorySpot: symbolsToOthersMap.get(item.order_symbol)?.market_type === 'S' || symbolsToOthersMap.get(item.order_symbol)?.market_type === 'Y' ? 'Y' : 'N',
          ClientCode: boidToClientCodeAndDealerIdMap.get(item.client_bo)?.ClientCode ?? "-",
          TraderDealerID: item.broker_workstation_id,
          OwnerDealerID: boidToClientCodeAndDealerIdMap.get(item.client_bo)?.DealerID ?? "-",
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
    const filename = `trade_${moment().format('YYYYMMDD_HHmmss')}.xml`;
    fs.writeFileSync(filename, xml);
    console.log('XML file saved.');
  } catch (ex) {
    console.error(ex);
  }
}


async function getClientData() {
  try {
    // Query all records
    const allRecords = await ClientsActive.findAll({
      attributes: ['ClientCode', 'DealerID', 'BOID'],
      where: {
        // Add your conditions here
      },
    });


    const boidToClientCodeAndDealerIdMap = new Map();
    allRecords.forEach(record => {
      boidToClientCodeAndDealerIdMap.set(record.BOID, {
        ClientCode: record.ClientCode,
        DealerID: record.DealerID,
      });
    });
    return boidToClientCodeAndDealerIdMap;

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Don't forget to close the Sequelize connection
    await sequelize.close();
  }
  //return allRecords;
}



async function getSymbolData() {
  try {
    // Query all records
    const allRecords = await DseMdSymbol.findAll({
      attributes: ['symbol', 'isin', 'market_type', 'symbol_category', 'symbol_instr'],
      where: {
        // Add your conditions here
      },
    });


    const symbolsToOthersMap = new Map();
    allRecords.forEach(record => {
      symbolsToOthersMap.set(record.symbol, {
        isin: record.isin,
        market_type: record.market_type,
        symbol_category: record.symbol_category,
        symbol_instr: record.symbol_instr,
      });
    });
    return symbolsToOthersMap;

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Don't forget to close the Sequelize connection
    await sequelizeMarketDB.close();
  }
  //return allRecords;
}





//export modules.......
module.exports = {
  stringToJSON,
  parseFIXMessageToJSONObject,
  // ConnctingToDatabase,
  parseDBObjectToXMLFile,
  getClientData,
  getSymbolData,
};

