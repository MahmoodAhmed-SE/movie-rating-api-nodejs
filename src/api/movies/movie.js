const express = require('express');
const router = express.Router();
const ntow = require('number-to-words');


const { getMovieWithPk } = require('../../services/movie_services');
const { getMyRating, getRatingsOfUsers } = require('../../services/user_services');

router.get('/:movie_id', async (req, res) => {
    const { movie_id } = req.params;

    if (!movie_id) {
        res.status(400).json({ message: "Movie id is not given!" });
    }

    const movie = await getMovieWithPk(movie_id);

    if (!movie) {
        res.status(400).json({ message: "Movie with the given id is not found!" });
    }
    

    processMovieBudgetToEngInfo(movie);

    await processMyRating(req.body.id.id, movie);

    await processAverageRating(movie);


    res.status(200).json(movie.dataValues);

});


const processMovieBudgetToEngInfo = (movie) => {
    movie.dataValues.budget_en = ntow.toWords(movie.dataValues.budget);
}

const processMyRating = async (id, movie) => {
    try {
        const my_rating = await getMyRating(id);
        movie.dataValues.my_rating = my_rating.dataValues.rating;
    }
    catch (err) {
        //
    } 
}

const processAverageRating = async ( movie) => {
    try {
        const ratings = await getRatingsOfUsers();

        let sum = 0;
        for (const rating of ratings) {
            sum += rating.dataValues.rating;
        }
        console.log()
        movie.dataValues.average_user_ratings = sum / ratings.length;
    }
    catch (err) {

    }
}

module.exports = router;