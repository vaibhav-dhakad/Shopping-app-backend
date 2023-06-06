const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const { getToken } = require("../config/jwt.config");
const { response } = require("express");
const { error } = require("console");
const User = db.users;
const Product = db.products;

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        console.log(file.originalname);
        if (mimeType && extName) {
            return cb(null, true);
        }
        if (error) {
            cb(error.message);
        }
    },
}).single("image");


const addProduct = async(req, res) => {
    try {
        let x = req.file.path
        console.log(x)
        const user_id = await getToken(req.headers.token);
        const product = await Product.create({
            image: req.file.path,
            product_name: req.body.product_name,
            category:req.body.category,
            userId: user_id,
            price: req.body.price,
            description: req.body.description,
            specification: req.body.specification
        });
        res.status(200).json(product);

    } catch (error) {

        res.status(200).json(error.message);
    }
};
const getUserProducts = async(req, res) => {
    const user_id = await getToken(req.headers.token);

    try {
        const user = await Product.findAll({
            include: User,
            where: {
                userId: user_id,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(200).json(error.message);
    }
};
const getAllProducts = async(req, res) => {
    // console.log(req.headers.token);
    // const user_id = await getToken(req.headers.token);

    try {
        const user = await Product.findAll({
            include: User,
            // where: {
            //     [Op.and]: [{
            //         userId: {
            //             [Op.ne]: user_id,
            //         },
            //         category: req.headers.category,
            //     }, ],
            // },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(200).json(error.message);
    }
};

module.exports = { addProduct, getUserProducts, getAllProducts, upload };