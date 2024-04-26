// Sequelize Client
const { DBConfiguration } = require('../../config');


// Models
const User = require('./User_model');
const Movie = require('./Movie_model');
const MovieRating = require('./MovieRating_model');


// Associations

// Define many-to-many association for movie rating 
User.belongsToMany(Movie, { through: 'MovieRating' });
Movie.belongsToMany(User, { through: 'MovieRating' });
MovieRating.belongsTo(User);
MovieRating.belongsTo(Movie);

(
    async () => {
        try {
            await DBConfiguration.sequelize.sync();
            console.log("Users table has been created successfully!");
        }
        catch (err) {
            console.error("Users Table creation error:", err);
        }
    }
)();


module.exports = {
    User, 
    Movie,
    MovieRating
}