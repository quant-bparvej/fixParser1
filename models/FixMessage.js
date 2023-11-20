const { DataTypes } = require('sequelize');
//const sequelize = require('../config/config.json'); // Replace with the path to your Sequelize database configuration
const sequelize = require('../db/connection');

const FixMessage = sequelize.define('FixMessages', {
  order_symbol: {
    type: DataTypes.STRING,
  },
  board_type: {
    type: DataTypes.STRING,
  },
  order_status: {
    type: DataTypes.STRING,
  },
  order_qty: {
    type: DataTypes.INTEGER,
  },
  order_rate: {
    type: DataTypes.FLOAT,
  },
  order_yield: {
    type: DataTypes.INTEGER,
  },
  exec_type: {
    type: DataTypes.STRING,
  },
  order_side: {
    type: DataTypes.STRING,
  },
  time_in_force: {
    type: DataTypes.STRING,
  },
  error_msg: {
    type: DataTypes.STRING,
  },
  orderid: {
    type: DataTypes.STRING,
  },
  client_bo: {
    type: DataTypes.STRING,
  },
  engineid: {
    type: DataTypes.STRING,
  },
  reforderid: {
    type: DataTypes.STRING,
  },
  leaves_qty: {
    type: DataTypes.INTEGER,
  },
  cum_qty: {
    type: DataTypes.INTEGER,
  },
  last_qty: {
    type: DataTypes.INTEGER,
  },
  last_px: {
    type: DataTypes.FLOAT,
  },
  avg_px: {
    type: DataTypes.FLOAT,
  },
  min_qty: {
    type: DataTypes.STRING,
  },
  drip_qty: {
    type: DataTypes.INTEGER,
  },
  order_type: {
    type: DataTypes.STRING,
  },
  broker_workstation_id: {
    type: DataTypes.STRING,
  },
  exch_time: {
    type: DataTypes.DATE,
  },
  broker_time: {
    type: DataTypes.DATE,
  },
  latency: {
    type: DataTypes.STRING,
  },
  trade_match_id: {
    type: DataTypes.STRING,
  },
  trade_date: {
    type: DataTypes.DATE,
  },
  settle_date: {
    type: DataTypes.DATE,
  },
  gross_trade_amt: {
    type: DataTypes.FLOAT,
  },
  agressor_indicator: {
    type: DataTypes.STRING,
  },
  execution_date: {
    type: DataTypes.DATE,
  },
  execution_time: {
    type: DataTypes.TIME,
  },
});

module.exports = FixMessage;
