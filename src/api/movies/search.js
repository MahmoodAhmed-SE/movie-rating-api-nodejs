const express = require('express');
const router = express.Router();

const { getAllMovies } = require('../../services/movie_services');



router.get('/', async (req, res) => {
    const { searchParameter } = req.body;


    if (!searchParameter) {
        return res.status(400).json({ message: "Search parameter was not included!" });
    }

    try {
        const movies = await getAllMovies();
    
        const searchResults = movies.filter(movie =>
            movie.dataValues.name.toLowerCase().includes(searchParameter.toLowerCase()) ||
            movie.dataValues.description.toLowerCase().includes(searchParameter.toLowerCase())
        );
        
        if (searchResults.length < 1) {
            return res.status(400).json({ message: "No results found!" })
        }

        res.status(200).json(searchResults);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while reaching movies database!" })
    }
});



module.exports = router;