const { Movie, MovieRating } = require('../models/sequelize');


const addListOfMovies = async (movies_list) => {
    try {
        await Movie.bulkCreate(movies_list);
    }
    catch (err) {
        console.error(`Error bulk create movies_list in the Movies table: \nSample: ${movies_list[0].release_date}\n:`, err);
    }
}


const getAllMovies = async () => {
    try {
        const movies = await Movie.findAll();
        return movies;
    } catch (err) {
        console.error('Finding all movies error:', err);
    }
}

const getMovieWithPk = async (id) => {
    try {
        const movie = await Movie.findByPk(id);
        return movie;
    } catch (err) {
        console.error('Finding movie error:', err);
    }
}

const getRatingsOfMovie = async (movieId) => {
    try {
        return await MovieRating.findAll({
            where: {
                MovieId: movieId
            }
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addListOfMovies,
    getAllMovies,
    getMovieWithPk,
    getRatingsOfMovie
}