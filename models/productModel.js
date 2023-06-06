module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {

        userId: {
            type: DataTypes.INTEGER


        },
        image: {
            type: DataTypes.STRING
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        },
        category: {
            type: DataTypes.STRING
        },
        specification: {
            type: DataTypes.STRING
        }


    }, {
        createdAt: false
    })

    return Product

}