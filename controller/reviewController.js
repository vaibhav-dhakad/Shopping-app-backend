const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { createToken } = require("../config/jwt.config");
const { getToken } = require("../config/jwt.config");
const Review = db.reviews;
const Product = db.products;
const addReview = async(req, res) => {
    try {
        const user_id = await getToken(req.headers.token, "is userId");
        console.log(req.body, "erqueddt");
        const review = await Review.create({
            userId: user_id,
            productId: req.body.productId,
            feedback: req.body.feedback,
            rating: req.body.rating,
        });
        res.status(200).json(review);
    } catch (error) {
        res.status(200).json(error);
    }
};
const getReviews = async(req, res) => {
    const review = await Review.findAll({
        include: Product,
        where: {
            productId: req.body.productId,
        },
    });
    res.status(200).json(review);
};
module.exports = { addReview, getReviews };