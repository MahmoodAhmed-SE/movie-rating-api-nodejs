const { DataTypes, Model } = require('sequelize')
const { DBConfiguration } = require('../../config')

const { sequelize } = DBConfiguration

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false 
        } 
    },
    {
        sequelize,
        modelName: 'User',
        createdAt: false,
        updatedAt: false,
    }
)


User.sync()
    .then((r) => console.log("Users table created successfully!", ))
    .catch((err) => console.log("Error in creating Users table: ", err))


module.exports = User
