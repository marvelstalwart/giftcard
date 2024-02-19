const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    vendorName: {type: String, required: true},
    review: {type:String, required: true},
    ratings:{type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    createdAt: {type: Date, required: true, default: Date.now}
})
const ReviewsSchema= mongoose.model('reviews', reviewSchema)
module.exports= ReviewsSchema