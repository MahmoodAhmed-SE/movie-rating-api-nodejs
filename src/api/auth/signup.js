const express = require('express')
const bcrypt = require('bcrypt') 

const router = express.Router()

const Client = require('../../database_connection')

const insertIntoDB = async (username, password) => {
    await Client`
    INSERT INTO Users(username, password) VALUES(${username}, ${password});
    `
}

router.post('/', async (req, res) => {
    console.log("start")
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = req.body.username

        try {
            await insertIntoDB(username, hashedPassword)
            res.status(200).json({ message: "Sign up process is Successful" })
        } 
        catch(err) {
            return res.status(400).json({"message": "Internal server error"})
        }
    }
    catch (err) {
        return res.status(400).json({"message": "Internal server error"})
    }
    console.log("finish")
})


module.exports = router
