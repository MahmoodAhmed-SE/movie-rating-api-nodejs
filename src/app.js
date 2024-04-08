const express = require('express')
const cors = require('cors')

const Client = require('./database_connection')()

const { DBConfiguration } = require('./config')
DBConfiguration.DBClient = Client

require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const apiRoutes = require('./api')
app.use('/api', apiRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port ${process.env.PORT}`)
})
