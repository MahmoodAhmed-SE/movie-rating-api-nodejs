const express = require('express')
const bcrypt = require('bcrypt')
const Client = require('../../database_connection')


const router = express.Router()
router.use(express.json())

const retrieveUsernameAndPassword = async (username) => {
    const result = await Client`
        SELECT username, password FROM Users
        WHERE username = ${username};
    `
    if (result.length == 0) return {username: undefined, password: undefined} // no data found
    return result[0];
}


router.post('/', async (req, res) => {
    try {
        const { username, password } = await retrieveUsernameAndPassword(req.body.username)
        
        if (!username)  {
            return res.status(300).json({message: "Username and password are incorrect"})
        }

        
        try {
            const isAuthenticated = await bcrypt.compare(req.body.password, password)
    
            if (!isAuthenticated) {
                return res.status(300).json({message: "username and password are incorrect"})
            }
            
            res.status(200).json({ message: "Authenticated successfully" })  
        }
        catch (err) {
            res.status(400).json({ message: "Internal Server Error" })
        }
        
    } 
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})


module.exports = router