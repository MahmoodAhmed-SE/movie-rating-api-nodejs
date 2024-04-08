const { Sequelize } = require('sequelize')


require('dotenv').config()
const sequelize = new Sequelize(process.env.DBName, process.env.DBUser, process.env.DBPassword, {
    host: process.env.DBHostname,
    port: process.env.DBPort,
    dialect: postgres
});

module.exports = sequelize