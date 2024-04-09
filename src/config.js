require('dotenv').config()

const config = {
    DBConfiguration: {
        host: process.env.DBHostname,
        port: process.env.DBPort,
        DBName: process.env.DBName, 
        DBUser: process.env.DBUser, 
        DBPassword: process.env.DBPassword,
        sequelize: null,
    }

}

module.exports = config