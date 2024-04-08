const { Sequelize } = require('sequelize')



const authenticateDBConnection = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.info('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 

const { DBConfiguration } = require('./config')

const connectToDatabase = () => {
    const sequelize = new Sequelize(DBConfiguration.DBName, DBConfiguration.DBUser, DBConfiguration.DBPassword, {
        host: DBConfiguration.host,
        port: DBConfiguration.port,
        dialect: 'postgres',
    });

    authenticateDBConnection(sequelize)

    return sequelize;
}



module.exports = connectToDatabase