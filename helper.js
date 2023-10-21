const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const { Parser, Builder  } = require('xml2js');

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


    const xmlElements = data.map(item => ({
      Detail: {
        $: {
          Action: "New",
          Status: "Filled",
          ISIN: "item.ISIN",
          AssetClass: "EQ",
          OrderID: item.orderid,
      
        },
      },
    }));

    // Define the data object to convert to XML
    const xmlData = {
      Trades: xmlElements,
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

