const User = require('../models/sequelize/user_model')



const createUser = async ({ username, hashed_password }) => {
    try {
        const user = await User.create({
            username,
            hashed_password
        })
        
        return user
    } 
    catch (err) {
        console.error("User creation error:", err.message)
        return err
    }
}


const findUser = async (usernameToLookUp) => {
    try {
        const users = await User.findAll({
            where: {
                username: usernameToLookUp
            }
        })

        return users
    }
    catch(err) {
        console.error('Finding all users error:', err.message)
        return err
    }
}


module.exports = {
    createUser, 
    findUser
}