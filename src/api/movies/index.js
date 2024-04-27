const express = require('express');
const router = express.Router();


const movieRoutes = require('./movie');
const allMoviesRoute = require('./allMovies');
const ratingsRoutes = require('./ratings');
const searchRoutes = require('./search');


router.use('/movie', movieRoutes);
router.use('/all', allMoviesRoute);
router.use('/ratings', ratingsRoutes);
router.use('/search', searchRoutes);

module.exports = router;