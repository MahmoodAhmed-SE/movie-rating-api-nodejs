const express = require('express')
const router = express.Router()

const signupRoutes = require('./signup.js')
const loginRoutes = require('./login.js')

router.use('/signup', signupRoutes)
router.use('/login', loginRoutes)

console.log(router.stack)

module.exports = router