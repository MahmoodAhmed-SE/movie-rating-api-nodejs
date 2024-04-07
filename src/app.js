const express = require('express')
const cors = require('cors')

const router = express.Router()
require('dotenv').config()

const app = express()

app.use(cors())

const apiRoutes = require('./api')
app.use('/api', apiRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port ${process.env.PORT}`)
})
