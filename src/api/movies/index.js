const express = require('express');
const router = express.Router();


const allMoviesRoute = require('./allMovies');
const ratingsRoutes = require('./ratings');

router.use('/all', allMoviesRoute);
router.use('/ratings', ratingsRoutes);


module.exports = router;