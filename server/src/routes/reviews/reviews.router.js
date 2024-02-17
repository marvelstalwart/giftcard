const {HttpGetReviews, HttpUpdateLikes, HttpDislike,  HttpCreateReview} = require("./reviews.controller")
const protect = require('../../middleware/auth')
const express = require("express")
const reviewsRouter = express.Router()

reviewsRouter.route('/').get(HttpGetReviews).post(protect, HttpCreateReview)
reviewsRouter.put('/likes/:id', protect, HttpUpdateLikes)
reviewsRouter.put('/likes/:id/unlike', protect, HttpDislike)
module.exports=reviewsRouter