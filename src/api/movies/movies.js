const express = require('express');
const router = express.Router();
const { getAllMovies } = require('../../services/movie_services');


// Api to retrieve all movies
router.get('/', async (req, res) => {
    const movies = await getAllMovies();
    res.status(200).json({ movies })
})


module.exports = router