const { DataTypes, Model } = require('sequelize');

const { DBConfiguration } = require('../../config');

class MovieRating extends Model { }


MovieRating.init(
    {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: DBConfiguration.sequelize,
        modelName: 'MovieRating',
    }
)


module.exports = MovieRating;