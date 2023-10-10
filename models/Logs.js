const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

// Create a Sequelize instance (replace with your database configuration)
const sequelize = new Sequelize({
  dialect: 'sqlite', // Use the appropriate database dialect
  storage: 'database.sqlite', // Replace with your database file path
});

// Define the Log model
const Log = sequelize.define('logs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  host: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  ip: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  fac: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  prio: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  llevel: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  tag: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  utcsec: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  r_utcsec: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  tzoffset: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  ldate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.fn('CURRENT_DATE'),
  },
  ltime: {
    type: Sequelize.TIME,
    defaultValue: Sequelize.fn('CURRENT_TIME'),
  },
  prog: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
  msg: {
    type: Sequelize.TEXT,
    defaultValue: null,
  },
});

// Synchronize the model with the database (create the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('Log model synchronized with database');
  })
  .catch((err) => {
    console.error('Error synchronizing Log model:', err);
  });

// Export the Log model for


module.exports = {
    Log
  };
