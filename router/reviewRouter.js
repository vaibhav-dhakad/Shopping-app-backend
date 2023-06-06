const express = require('express');
const { addReview, getReviews } = require('../controller/reviewController')
const router = express.Router()
router.post('/addReview', addReview)
router.post('/allReviews', getReviews)
module.exports = router