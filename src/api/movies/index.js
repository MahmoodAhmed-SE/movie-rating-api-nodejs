const express = require('express');
const router = express.Router();


const allMoviesRoute = require('./movies');

router.use('/all', allMoviesRoute);



module.exports = router;