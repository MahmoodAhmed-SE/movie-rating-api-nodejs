const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
router.use(express.json())


const UserServices = require('../../services/user_services')

const { DBClient } = { DBConfiguration } = require('../../config')
const userService = new UserServices(DBClient) 



router.post('/', async (req, res) => {
    try {
        // TO-DO: validate req.body inputs
        
        const username = req.body.username
        
        const user = userServices.findUser(usernameToLookUp)
        
        if (user.length == 0)  {
            return res.status(300).json({message: "Username and password are incorrect"})
        }

        
        try {
            const isAuthenticated = await bcrypt.compare(req.body.password, user[0].hashed_password)
    
            if (!isAuthenticated) {
                return res.status(300).json({message: "username and password are incorrect"})
            }
            
            res.status(200).json({ message: "Authenticated successfully" })  
            
            // store session for authorization

        }
        catch (err) {
            return res.status(400).json({ message: "Internal Server Error" })
        }
        

    } 
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})


module.exports = router