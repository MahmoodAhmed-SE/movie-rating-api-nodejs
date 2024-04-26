const express = require('express');
const router = express.Router();


const movieRoutes = require('./movie');
const allMoviesRoute = require('./allMovies');
const ratingsRoutes = require('./ratings');

router.use('/', movieRoutes);
router.use('/all', allMoviesRoute);
router.use('/ratings', ratingsRoutes);

module.exports = router;