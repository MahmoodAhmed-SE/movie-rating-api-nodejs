const { DataTypes, Model } = require('sequelize');

const { DBConfiguration } = require('../../config');

class Movie extends Model { }

Movie.init(
    {
        id: {
            type: DataTypes.NUMBER,
            // defaultValue: DataTypes.UUIDV1,
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
            await Movie.sync();
            console.log("Movies Table has been created successfully!");
        }
        catch (err) {
            console.error("Movies Table creation error:", err);
        }
    }
)();


module.exports = Movie;