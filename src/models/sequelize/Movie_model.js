const { INTEGER, TEXT, DATEONLY, Model, ARRAY, DOUBLE } = require('sequelize');

const { DBConfiguration } = require('../../config');

class Movie extends Model { }

Movie.init(
    {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: TEXT,
            allowNull: false
        },
        description: {
            type: TEXT,
            allowNull: false
        },
        release_date: {
            type: DATEONLY
        },
        main_cast: {
            type: ARRAY(TEXT)
        },
        director: {
            type: TEXT
        },
        budget: {
            type: DOUBLE
        }
    }, {
    sequelize: DBConfiguration.sequelize,
    modelName: 'Movie',
});


module.exports = Movie;