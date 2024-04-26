const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const router = express.Router();

require('dotenv').config();

const { findUser, createUser } = require('../../services/user_services');


const isUserRegistered = async (usernameToLookUp) => {
    const user = await findUser(usernameToLookUp);
    if (user.length == 0) {
        return false;
    }
    else {
        return true;
    }
}

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// route: /api/auth/signup
router.post('/', async (req, res) => {

    try {
        // Security TO-DO: validate input req.body

        const username = req.body.username;
        if (await isUserRegistered(username)) {
            return res.status(400).json({ message: "Username is already taken" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password, salt);



        try {
            const user = await createUser({ username, hashed_password });
            signJWT(res, { id: user.dataValues.id });
        }
        catch (err) {
            console.error("User creation error:", err.message);
            // TO-DO: deal with database problem
            return res.status(500).json({ "message": "Internal server error" });
        }
    }
    catch (err) {
        console.error("Encryption error:", err.message);
        // TO-DO: deal with password hashing problem
        return res.status(500).json({ "message": "Internal server error" });
    }
});


const signJWT = (res, payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) {
            // TO-DO: handle tokenization error
            console.log("siging jwt error:", err);
        }
        else {
            res.status(200).json({
                message: "Sign up process is Successfull and user authenticated successfully!",
                token
            });
        }
    });
}


module.exports = router;
