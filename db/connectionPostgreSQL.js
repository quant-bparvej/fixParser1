const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres', // Use 'postgres' for PostgreSQL
  host: process.env.DB_HOST_POSTGRESQL,
  port: process.env.DB_PORT_POSTGRESQL,
  username: process.env.DB_USERNAME_POSTGRESQL,
  password: process.env.DB_PASSWORD_POSTGRESQL,
  database: process.env.DB_DATABASE_POSTGRESQL,
  logging: false, // Set to true to log SQL queries
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Postgre Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the PostgreDB:', err);
  });

module.exports = sequelize;
