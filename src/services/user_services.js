const { User, MovieRating, Movie } = require('../models/sequelize');



const createUser = async ({ username, hashed_password }) => {
    try {
        const user = await User.create({
            username,
            hashed_password
        });

        return user;
    }
    catch (err) {
        console.error("User creation error:", err.message);
        return err;
    }
}


const findUser = async (usernameToLookUp) => {
    try {
        const users = await User.findAll({
            where: {
                username: usernameToLookUp
            }
        });

        return users;
    }
    catch (err) {
        console.error('Finding all users error:', err.message);
        return err;
    }
}

const rateMovie = async (UserId, MovieId, rating) => {
    try {
        const user = User.findByPk(UserId);
        const movie = Movie.findByPk(MovieId);


        if (!user) throw Error("No user with the given id found.");
        if (!movie) throw Error("No movie with the given id found.");

        
        await MovieRating.create({
            UserId,
            MovieId,
            rating
        });
    }
    catch(err) {
        if (err.message == "No user with the given id found." || err.message == "No movie with the given id found.") {
            throw err;
        } else {
            console.log(err);
        }
    }
}


module.exports = {
    createUser,
    findUser,
    rateMovie
}