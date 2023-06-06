const { Sequelize, literal, DATE } = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {

        name: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },


    }, {
        timestamps: false
    })
    return User
}