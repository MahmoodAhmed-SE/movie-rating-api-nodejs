const express = require('express');
const router = express.Router();

// Api to retrieve all movies
router.get('/', (req, res) => {
    res.status(200).json({
        movies: [
            1,2,3,4,5
        ]
    })
})


module.exports = router