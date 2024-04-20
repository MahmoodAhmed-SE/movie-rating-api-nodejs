const express = require('express');
const expressListEndpoints = require('express-list-endpoints');

const cors = require('cors');

// Connecting db and returning [sequelize] db client.
const sequelize = require('./database_connection')();

// Setting [sequelize] db client in config.js for global usage
const { ServerConfiguration, DBConfiguration } = require('./config');
DBConfiguration.sequelize = sequelize;

// Inserting local movies data from movies.json file into the database on app start. 
const { addLocalMoviesToDB } = require('./database_app_startup_insertions/add_local_movies');
addLocalMoviesToDB();

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



const apiRoutes = require('./api');

app.use('/api', apiRoutes);


console.log(expressListEndpoints(app), '\n\n');

app.listen(ServerConfiguration.port, () => {
    console.log(`Server up and running on port ${ServerConfiguration.port}`, "\n\n");
})