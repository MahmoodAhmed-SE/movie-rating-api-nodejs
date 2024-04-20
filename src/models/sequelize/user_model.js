const { DataTypes, Model } = require('sequelize');
const { DBConfiguration } = require('../../config');

const { sequelize } = DBConfiguration;

class User extends Model { }

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
);


(
    async () => {
        try {
            await User.sync({ force: true });
            console.log("Users table has been created successfully!");
        }
        catch (err) {
            console.error("Users Table creation error:", err);
        }
    }
)();


module.exports = User;
