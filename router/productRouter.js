const express = require('express');

// const { getToken } = require('../config/jwt.config')
const router = express.Router()
const { addProduct, getUserProducts, getAllProducts, upload } = require('../controller/productController')
router.post('/addProduct', upload, addProduct);
router.get('/getUserProducts', getUserProducts);
router.get('/getAllProducts', getAllProducts);


module.exports = router