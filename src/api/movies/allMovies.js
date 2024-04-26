const express = require('express');
const router = express.Router();
const { getAllMovies, getRatingsOfMovie } = require('../../services/movie_services');


// Api to retrieve all movies with their average rating
router.get('/', async (req, res) => {
    const movies = await getAllMovies();

    await getAvgRating(movies);

    res.status(200).json({ movies });
});


/* [getAvgRating] is used to add the average rating of each 
movie to the movies list of movie objects. As well as, limit the descritpion to 100 chars*/
const getAvgRating = async (movies) => {
    for (const movie of movies) {

        /* if the movie description is more 100 chars, check where the last space (' ') before 100 chars is at 
        (this is to ensure we don't truncate a full meaningful word) and truncate it with ' ...' 
        */
        if (movie.description.length > 100) {
            for (let i = 99; i > 0; --i) {
                if (movie.description[i] === ' ') {
                    movie.description = movie.description.slice(0, i) + ' ...';
                    console.log(movie.description);
                    break;
                }
            }
        }

        // get the ratings of [movie] with given id 
        const ratingsList = await getRatingsOfMovie(movie.id);

        /* if the list is empty, set [average_rating] to null, 
        otherwise, set it to sum of ratings divided by the number of ratings. */
        if (ratingsList.length > 0) {
            let sum = 0;
            for (const ratingObject of ratingsList) {
                sum += ratingObject.dataValues.rating;
            }
            movie.dataValues.average_rating = sum / ratingsList.length;
        }
        else {
            movie.dataValues.average_rating = null;
        }
    }
}


module.exports = router;