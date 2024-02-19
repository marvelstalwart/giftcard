const ReviewsSchema = require('../models/ReviewSchema')

async function createReview (vendorName,review, ratings, createdBy){
    const newReview = new ReviewsSchema({
        vendorName,
        review,
        ratings,
        createdBy
    })
    try {
        return await newReview.save()
    }
    catch(err) {
        throw new Error (err)
    }
}
async function findReviewById (id){
    try {
        return await ReviewsSchema.findById(id)
    }
    catch(err){
        throw new Error (err)
    }
}
async function getReviews (){
    try {
        return await ReviewsSchema.find().populate('createdBy')
    }
    catch (err){
        throw new Error(err)
    }
} 

async function updateLikes(id, userId) {
    try {
        return await ReviewsSchema.findOneAndUpdate(
            {_id: id}
            , {
            $push: {likes: userId}
        },
        {new: true})
    }
    catch (err){
        throw new Error(err)
    }
}

async function dislike (id, userId){
    try {
        return await ReviewsSchema.findOneAndUpdate(
            {_id: id},
          {$pull: {likes: userId}},
          {new:true}
        )
    }catch(err){
        throw new Error(err)
    }
}
async function findLike(userId, reviewId) {
    try {
        return await ReviewsSchema.findOne({
            _id: reviewId,
            likes: {$in: [userId]}
        })
    }
    catch (err){
        throw new Error(err)
    }
}

module.exports = {
    createReview,
    updateLikes,
    getReviews,
    findLike,
    findReviewById,
    dislike
}