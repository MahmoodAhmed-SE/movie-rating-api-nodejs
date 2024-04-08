const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    const USERS = sequelize.define('USERS', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[0-9a-zA-Z]{64}$/i
            }
        }, 
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false 
        }
    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    })

    sequelize.sync()

    return USERS
}