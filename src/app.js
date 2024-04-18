const express = require('express');
const expressListEndpoints = require('express-list-endpoints');

const cors = require('cors');

const sequelize = require('./database_connection')();

const { ServerConfiguration, DBConfiguration } = require('./config');
DBConfiguration.sequelize = sequelize;

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



const apiRoutes = require('./api');

app.use('/api', apiRoutes);


console.log(expressListEndpoints(app), '\n\n')

app.listen(ServerConfiguration.port, () => {
    console.log(`Server up and running on port ${ServerConfiguration.port}`, "\n\n");
})