const jwt = require('jsonwebtoken');


require('dotenv').config()

const authorizationJWT = (req, res, next) => {    
    if (typeof req.headers.authorization !== 'undefined') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized Access" });
            } else {
                req.body.id = { id } = decoded;
                return next();
            }
        });
    } else {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
}


module.exports = {
    authorizationJWT
}