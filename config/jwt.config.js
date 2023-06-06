const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = async(data) => {
    const token = await jwt.sign(data, process.env.SECRET_KEY)
    return token
}
const getToken = async(token) => {
    const data = await jwt.verify(token, process.env.SECRET_KEY)

    return data.user.id
}
module.exports = { createToken, getToken }