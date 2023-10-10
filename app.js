const express = require("express");
const app = express();
const ejs = require('ejs');
const { stringToJSON, parseFIXMessageToJSONObject, ConnctingToDatabase } = require('./helper'); // Adjust the path as needed

const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //res.send('Hello World!')
  var pageTitle = "Welcome to your Website";
  const message = "This is a dynamic message from the server.";
  const inputString =
    'Processed Message: {"order_symbol": "SHAHJABANK", "board_type": "BLOCK", "order_status": "C", "order_qty": "30000", "order_rate": "17.5", "order_yield": 0, "exec_type": "C", "order_side": "1", "time_in_force": "0", "error_msg": "", "orderid": "T3khqiY0", "client_bo": "1203110036734936", "engineid": "2023091494914", "reforderid": "T3khqiY0", "leaves_qty": "0", "cum_qty": "0", "last_qty": "", "last_px": "", "avg_px": "", "min_qty": "", "drip_qty": "", "order_type": "2", "broker_workstation_id": "UFTTRDR014", "exch_time": "20230914-08:32:02.255", "broker_time": "", "latency": "", "trade_match_id": "", "trade_date": "", "settle_date": "", "gross_trade_amt": "", "agressor_indicator": ""}    ';
  const parsedObject = stringToJSON(inputString);
  parseFIXMessageToJSONObject(message);
  var db = ConnctingToDatabase();
  if (db) {
      console.log('database ante parse');
    
  } else {
    console.log('database paay nai');
    
  }


  

  if (parsedObject !== null) {
    // Now you can work with the parsed object
    console.log(parsedObject.order_symbol);
    console.log(parsedObject.board_type);
    // ... and so on for other fields
    res.render("index", { pageTitle, message, parsedObject });
  }
  else {
    pageTitle = "error found";
    res.render("index", { pageTitle, message });
  }
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
