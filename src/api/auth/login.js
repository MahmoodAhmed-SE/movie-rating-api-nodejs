const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const router = express.Router();

require('dotenv').config();

const { findUser } = require('../../services/user_services');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/', async (req, res) => {

    try {
        // TO-DO: validate req.body inputs

        const usernameToLookUp = req.body.username;

        const user = await findUser(usernameToLookUp);

        if (user.length == 0) {
            return res.status(300).json({ message: "Username and password are incorrect" })
        }


        try {
            const isAuthenticated = await bcrypt.compare(req.body.password, user[0].hashed_password);
            
            if (!isAuthenticated) {
                return res.status(300).json({ message: "Username and password are incorrect" });
            }
            
            
            // Signing a JWT and sending it back to user for authorization
            signJWT(res, {
                id: user[0].id
            })
            


        }
        catch (err) {
            return res.status(400).json({ message: "Internal Server Error" });
        }


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const signJWT = (res, payload) => {
    JWT.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) {
            // TO-DO: handle tokenization error
            console.log("siging jwt error:", err)
        }
        else {
            res.status(200).json({ 
                message: "Authenticated successfully",
                token
            });
        }
    });
}

module.exports = router;