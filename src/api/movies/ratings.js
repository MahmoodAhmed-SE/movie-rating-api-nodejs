const express = require('express');
const router = express.Router();
const { rateMovie } = require('../../services/user_services');

router.post('/:movie_id', async (req, res) => {
    const { id, rate } = req.body;
    const { movie_id } = req.params;

    if (!rate || rate < 0 || rate > 10 || !Number.isInteger(rate)) {
        return res.status(400).json({ message: 'Rating data is missing or was not expected.' });
    }

    try {
        await rateMovie(id.id, movie_id, rate);
        res.status(200).json({ message: "Movie has been rated successfully!" });
    }
    catch (err) {
        if (err.message == "No user with the given id found." || err.message == "No movie with the given id found.") {
            res.status(400).json({ message: "Request body was not expected!" });
        } else {
            res.status(500).json({ message: "Server error!" });
        }
    }
});




module.exports = router;