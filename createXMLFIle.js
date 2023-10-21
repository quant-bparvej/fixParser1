
const {parseDBObjectToXMLFile} = require('./helper'); 
const FixMessage = require('./models/FixMessage');
const db = require('./db/connectionSQLite');
const { Op } = require("sequelize");

async function getData(){

    
await FixMessage.findAll().then((data)=> {

    let result = parseDBObjectToXMLFile(data);
    
  });
}

//getData();
parseDBObjectToXMLFile();
