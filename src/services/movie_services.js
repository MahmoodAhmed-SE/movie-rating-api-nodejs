const Movie = require('../models/sequelize/movie_model');


const addListOfMovies = async (movies_list) => {
    try {
        await Movie.bulkCreate(movies_list);
    }
    catch (err) {
        console.error(`Error bulk create movies_list in the movies table: \n sample: ${movies_list[0]}\n:`, err)
    }
}




module.exports = {
    addListOfMovies
}