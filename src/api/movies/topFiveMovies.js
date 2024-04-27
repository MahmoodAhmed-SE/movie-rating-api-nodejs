const express = require('express');
const router = express.Router();

const { getRatings, getMovieWithPk } = require('../../services/movie_services');


router.get('/', async (req, res) => {
    try {
        const ratings = await getRatings();

        const movies_map = {};

        for(const rating of ratings) {
            if (!movies_map[rating.dataValues.MovieId]) {
                movies_map[rating.dataValues.MovieId] = rating.dataValues.rating;
            } else {
                movies_map[rating.dataValues.MovieId] += rating.dataValues.rating;
            }
        }

        const sortedMovies = Object.keys(movies_map).sort((a, b) => movies_map[b] - movies_map[a]);

        const top5MoviesIds = sortedMovies.slice(0, 5);
        const top5Movies = [];

        for (const movie of top5MoviesIds) {
            top5Movies.push(await getMovieWithPk(movie));
        }
        
        res.status(200).json(top5Movies);
    }
    catch (err) {
        res.status(500).json({ message: "Error while fetching server data." });
    }

});




module.exports = router;