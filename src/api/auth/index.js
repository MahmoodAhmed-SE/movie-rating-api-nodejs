const express = require('express')
const router = express.Router()

const signupRoutes = require('./signup')
const loginRoutes = require('./login')

router.use('/signup', signupRoutes)
router.use('/login', loginRoutes)


module.exports = router