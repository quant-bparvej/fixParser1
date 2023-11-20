const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectionPostgreSQL'); // Replace with your Sequelize instance

const ClientsActive = sequelize.define('ClientsActive', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ClientCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DealerID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BOID: {
    type: DataTypes.BIGINT,
  },
  WithNetAdjustment: {
    type: DataTypes.STRING,
  },
  Name: {
    type: DataTypes.STRING,
  },
  Address: {
    type: DataTypes.STRING,
  },
  ICNo: {
    type: DataTypes.STRING,
  },
  AccountType: {
    type: DataTypes.STRING,
  },
  ShortSellingAllowed: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'clients_active',
  timestamps: false, // Remove if you want Sequelize to manage createdAt and updatedAt
  indexes: [
    {
      unique: true,
      fields: ['ClientCode'],
    },
    {
      fields: ['DealerID'],
    },
  ],
});

module.exports = ClientsActive;
