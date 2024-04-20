require('dotenv').config();

const config = {
    ServerConfiguration: {
        host: process.env.HOSTNAME,
        port: process.env.PORT,
    },
    DBConfiguration: {
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        DBName: process.env.DB_NAME, 
        DBUser: process.env.DB_USER, 
        DBPassword: process.env.DB_PASSWORD,
        sequelize: null,
    }
}

module.exports = config;