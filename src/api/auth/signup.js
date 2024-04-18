const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()


const { findUser, createUser } = require('../../services/user_services')


const isUserRegistered = async (usernameToLookUp) => {
    const user = await findUser(usernameToLookUp)
    if (user.length == 0) {
        return false;
    }
    else {
        return true
    }
}

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

// route: /api/auth/signup
router.post('/', async (req, res) => {

    try {
        // Security TO-DO: validate input req.body

        const username = req.body.username
        if (await isUserRegistered(username)) {
            return res.status(400).json({ message: "Username is already taken" })
        }


        const salt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(req.body.password, salt)



        try {
            await createUser({ username, hashed_password })
            return res.status(200).json({ message: "Sign up process is Successful" })

            // TO-DO: authorize by storing session
        }
        catch (err) {
            console.error("User creation error:", err.message)
            // TO-DO: deal with database problem
            return res.status(500).json({ "message": "Internal server error" })
        }
    }
    catch (err) {
        console.error("Encryption error:", err.message)
        // TO-DO: deal with password hashing problem
        return res.status(500).json({ "message": "Internal server error" })
    }
})


module.exports = router
