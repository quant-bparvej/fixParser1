const { parseDBObjectToXMLFile, getClientData } = require("./helper");
const FixMessage = require("./models/FixMessage");
const db = require("./db/connectionSQLite");
const { Op } = require("sequelize");

async function getData() {


  try {
    const paramsForTradeFile = [
      "order_symbol",
      "board_type",
      "order_status",
      "order_qty",
      "order_rate",
      "exec_type",
      "order_side",
      "orderid",
      "client_bo",
      "engineid",
      "reforderid",
      "order_type",
      "broker_workstation_id",
      "exch_time",     // this is in datetime format
      "last_qty",
      "last_px",
      "execution_time",
      "execution_date",
      
    ];
    await FixMessage.findAll({
      attributes: paramsForTradeFile,
      //limit: 1000, ///add where msg=null
    }).then((data) => {
      // Process the data as needed
      // data.map((result) => ({
      //   Action: 'NEW', // Replace with your desired value
      //   Status: '-', // Replace with your desired value
      //   ISIN: 'BD0637FRSL08', // Replace with your desired value
      //   AssetClass: 'EQ',
      //   OrderID: result.orderid, // Use the corresponding parameter from your database
      //   RefOrderID: result.reforderid, // Use the corresponding parameter from your database
      //   Side: result.order_side, // Use the corresponding parameter from your database
      //   BOID: result.client_bo, // Use the corresponding parameter from your database
      //   SecurityCode: result.order_symbol, // Use the corresponding parameter from your database
      //   Board: result.board_type, // Use the corresponding parameter from your database
      //   Date: '20231017', // Replace with your desired value
      //   Time: '08:30:02', // Replace with your desired value
      //   Quantity: result.order_qty, // Use the corresponding parameter from your database
      //   Price: result.order_rate, // Use the corresponding parameter from your database
      //   Value: result.order_qty * result.order_rate, // Calculate the value
      //   ExecID: result.exec_type, // Use the corresponding parameter from your database
      //   Session: 'CLOSED', // Replace with your desired value
      //   FillType: 'FILLTYPE', // Replace with your desired value
      //   Category: 'A', // Replace with your desired value
      //   CompulsorySpot: 'N', // Replace with your desired value
      //   ClientCode: result.client_bo, // Use the corresponding parameter from your database
      //   TraderDealerID: 'UFTTRDR020', // Replace with your desired value
      //   OwnerDealerID: 'UFTTRDR020', // Replace with your desired value
      //   TradeReportType: 'TRADE_REPORT_TYPE', // Replace with your desired value
      // }));
      let result = parseDBObjectToXMLFile(data);
    });
  } catch (ex) {
    console.log(ex);
  }
}

getData();
//parseDBObjectToXMLFile();
