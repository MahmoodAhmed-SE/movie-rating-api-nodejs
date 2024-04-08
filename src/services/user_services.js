const Models = require('../models/sequelize')

class UserService {
    constructor (sequelize) {
        Models(sequelize)
        this.client = sequelize
        this.models = sequelize.models
    }


    createUser = async ({username, hashedPassword}) => {
        try {
            const user = await this.models.USERS.create({
                username,
                hashedPassword
            })

            return user
        } 
        catch (err) {
            return err
        }
    }


    findUser = async (usernameToLookUp) => {
        try {            
            const users = await this.models.USERS.findAll({
                attributes: ['username', 'hashed_password'],
                where: {
                    username: usernameToLookUp
                }
            })

            return users
        }
        catch(err) {
            return err
        }
    }
}

module.exports = UserService