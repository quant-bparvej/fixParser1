const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = require('../db/connectionPostgreSQLMarketDB'); // Replace with your Sequelize instance


// Define the model
const DseMdSymbol = sequelize.define('DseMdSymbol', {
  board: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderbook_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  market_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  symbol_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  symbol_instr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_update: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maturity_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'dse_md_symbols',
  timestamps: false, // Disable timestamps (created_at and updated_at columns)
});

// Test the model
DseMdSymbol.sync()
  .then(() => {
    console.log('DseMdSymbol model synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing DseMdSymbol model:', err);
  });

module.exports = DseMdSymbol;
