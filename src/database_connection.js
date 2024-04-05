const postgres = require('postgres')

require('dotenv').config()

const Client = postgres({
    host: process.env.DBHostname,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    port: process.env.DBPort,
    database: process.env.DBName
})

module.exports = Client