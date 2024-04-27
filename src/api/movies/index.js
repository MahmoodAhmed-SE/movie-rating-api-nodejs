const express = require('express');
const router = express.Router();


const movieRoutes = require('./movie');
const allMoviesRoute = require('./allMovies');
const ratingsRoutes = require('./ratings');
const searchRoutes = require('./search');
const topFiveMovies = require('./topFiveMovies');


router.use('/movie', movieRoutes);
router.use('/all', allMoviesRoute);
router.use('/ratings', ratingsRoutes);
router.use('/search', searchRoutes);
router.use('/top-5-movies', topFiveMovies);


module.exports = router;