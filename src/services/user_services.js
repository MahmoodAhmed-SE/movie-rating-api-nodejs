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


const getMyRating = async (userId, movieId) => {
    try {
        return await MovieRating.findOne({
            where: {
                UserId: userId,
                MovieId: movieId
            }
        });
    }
    catch (err) {
        console.error('Finding user rating on given movie error:', err.message);
        return err;
    }
}

const getRatingsOfUsersOnMovie = async (movieId) => {
    try {
        return await MovieRating.findAll({
            where: {
                MovieId: movieId
            }
        });
    }
    catch (err) {
        console.error('Finding all ratings:', err.message);
        return err;
    }
}

module.exports = {
    createUser,
    findUser,
    rateMovie,
    getMyRating,
    getRatingsOfUsersOnMovie
}