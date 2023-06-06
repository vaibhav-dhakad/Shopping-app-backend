const dbConfig = require('../config/db.config');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        logging: true,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }

    })


sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./ReviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({
        force: false
    })
    .then(() => {
        console.log('yes re-sync done!')
    })



db.users.hasMany(db.products, {
    foreignKey: 'userId',
})
db.products.belongsTo(db.users, {
    foreignKey: 'userId',

})

// db.users.hasMany(db.reviews, {
//     foreignKey: 'productId',
// })
// db.reviews.belongsTo(db.users, {
//     foreignKey: 'productId'
// })

db.products.hasMany(db.reviews, {
    foreignKey: 'productId',
})
db.reviews.belongsTo(db.products, {
    foreignKey: 'productId'
})




module.exports = db