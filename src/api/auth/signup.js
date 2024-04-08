const express = require('express')
const bcrypt = require('bcrypt') 

const router = express.Router()


const UserServices = require('../../services/user_services')

const { DBClient } = { DBConfiguration } = require('../../config')
const userServices = new UserServices(DBClient)


const isUserRegistered = (usernameToLookUp) => {
    const user = userServices.findUser(usernameToLookUp)
    if (user.length == 1) return true
    else return false 
}

// route: /api/auth/signup
router.post('/', async (req, res) => {

    try {
        // Security TO-DO: validate input req.body

        const username = req.body.username
        if (!isUserRegistered(username)) {
            return res.status(300).json({ message: "Username is already taken" })
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        

        try {
            await userServices.createUser({username, hashedPassword})
            res.status(200).json({ message: "Sign up process is Successful" })

            // TO-DO: authorize by storing session
        } 
        catch(err) {
            // TO-DO: deal with database problem
            return res.status(500).json({"message": "Internal server error"})
        }
    }
    catch (err) {
        // TO-DO: deal with password hashing problem
        return res.status(500).json({"message": "Internal server error"})
    }
})


module.exports = router
