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
    updatedAt: false,
    createdAt: false
}
);


(
    async () => {
        try {
            await Movie.sync({ force: true });
            console.log("Movies Table has been created successfully!");
        }
        catch (err) {
            console.error("Movies Table creation error:", err);
        }
    }
)();


module.exports = Movie;