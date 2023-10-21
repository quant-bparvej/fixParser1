const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const { Parser, Builder  } = require('xml2js');





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


function parseDBObjectToXMLFile() {
  try {

///this is a dummay data for testing
    const dummyData = [
      {
        Action: "New Action 1",
        ISIN: "$isin 1",
        AssetClass: "EQ",
        OrderID: "$order_id 1",
        BOID: "$boid 1",
      },
      {
        Action: "New Action 2",
        ISIN: "$isin 2",
        AssetClass: "EQ",
        OrderID: "$order_id 2",
        BOID: "$boid 2",
      },
      {
        Action: "New Action 3",
        ISIN: "$isin 3",
        AssetClass: "EQ",
        OrderID: "$order_id 3",
        BOID: "$boid 3",
      },
      // Add more data objects
    ];


    // Define the data object to convert to XML
    const xmlData = {
      Trades: {
        Detail: dummyData.map(item => ({ $: item })),
      },
    };
    
    

    // Create a new XML builder
    //const builder =  Builder({ rootName: 'data' });
    const builder = new Builder();
    //const builder = new Builder({ rootName: 'Trades', headless: true });

    // Convert data to XML
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

