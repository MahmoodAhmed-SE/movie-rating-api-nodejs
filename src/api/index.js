const express = require('express');
const router = express.Router();

// Middleware for authorizing login in users only
const { authorizationJWT } = require('../middlewares/auth');


const authRoutes = require('./auth');
const moviesRoutes = require('./movies');


router.use('/auth', authRoutes);
router.use('/movies', authorizationJWT, moviesRoutes);

module.exports = router;