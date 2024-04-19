const { DataTypes, Model } = require('sequelize');

const { DBConfiguration } = require('../../config');

class Movie extends Model { }

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isCorrectDateFormat(value) {
                    // Check if the value matches the 'yyyy-mm-dd' format
                    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                        throw new Error('Date must be in the format yyyy-mm-dd');
                    }
                },
            },
        },
        main_cast: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        },
        director: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        budget: {
            type: DataTypes.DOUBLE(undefined, 2)
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