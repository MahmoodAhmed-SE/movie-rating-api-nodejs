const express = require('express')
const bcrypt = require('bcrypt') 

const router = express.Router()

router.use(express.json())

const Client = require('../../database_connection')

const insertIntoDB = async (username, password) => {
    await Client`
    INSERT INTO Users(username, password) VALUES(${username}, ${password});
    `
}

router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const username = req.body.username

        try {
            await insertIntoDB(username, hashedPassword)
            res.status(200).json({ message: "Sign up process is Successful" })
        } 
        catch(err) {
            return res.status(500).json({"message": "Internal server error"})
        }
    }
    catch (err) {
        return res.status(500).json({"message": "Internal server error"})
    }
})


module.exports = router
