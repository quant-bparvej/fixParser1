const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres', // Use 'postgres' for PostgreSQL
  host: process.env.DB_HOST_POSTGRESQL,
  port: process.env.DB_PORT_POSTGRESQL_MARKET_DB,
  username: process.env.DB_USERNAME_POSTGRESQL_MARKET_DB,
  password: process.env.DB_PASSWORD_POSTGRESQL_MARKET_DB,
  database: process.env.DB_DATABASE_POSTGRESQL_MARKET_DB,
  logging: false, // Set to true to log SQL queries
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Postgre Market DB connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the Postgre DSE Market DB:', err);
  });

module.exports = sequelize;
