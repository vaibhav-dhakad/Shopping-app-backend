module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {

        userId: {
            type: DataTypes.INTEGER


        },

        productId: {
            type: DataTypes.INTEGER


        },

        feedback: {
            type: DataTypes.STRING
        },

        rating: {
            type: DataTypes.INTEGER
        },



    }, {
        createdAt: false
    })

    return Review

}