const express = require('express')
const bcrypt = require('bcrypt')
const Client = require('../../database_connection')

const router = express.Router()

const getUsername = async (username) => {
    return await Client`
        SELECT username, password FROM Users
        WHERE username = ${username};
    `
}

router.post('/', async (req, res) => {
    let username, password

    try {
        [ username, password ] = await getUsername(req.body.username)

        if (username == undefined)  {
            return res.status(300).json({message: "Username and password are incorrect"})
        }
    } 
    catch (err) {
        return res.status(400).json({message: "Internal Server Error"})
    }


    try {
        if (username) {
            const isAuthenticated = await bcrypt.compare(req.body.password, userPassword)

            if (!isAuthenticated) {
                return res.status(300).json({message: "username and password are incorrect"})
            }
            
            res.status(200).json({ message: "Authenticated successfully" })
        } 
    }
    catch (err) {
        res.status(400).json({ message: "Internal Server Error" })
    }
})


module.exports = router