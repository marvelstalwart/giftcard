const {createReview, updateLikes, dislike, findLike, getReviews, findReviewById} = require("../../services/reviews.mongo")


const  HttpCreateReview = async (req,res)=> {
    const {vendorName, review, ratings, createdBy }  = req.body
        

    try {

            const newReview = await createReview(vendorName, review, ratings, createdBy)
            return res.status(200).json(newReview)
        }
        catch(err) {
            return res.status(400).json({Error: err, message: "An error occured!"})
        }

} 

const HttpUpdateLikes = async (req,res)=> {
    const userId = req.authenticatedUserId
    const reviewId = req.params.id
    const alreadyLiked = await findLike(userId, reviewId)
    if (alreadyLiked) {
       
        return 
    }

    const reviewExists = await findReviewById(reviewId)
    if (!reviewExists){
        return res.status(400).json({Type:"Review", message:"Review does not exist!"})
    }
    try {
        const updatedReview  = await updateLikes(reviewExists._id,userId)
        
        return res.status(200).json(updatedReview)
    }
    catch(err) {
        return res.status(400).json({Error: err, message: "An error occured!"})
    }
}


const HttpDislike = async (req,res)=>{
    const userId = req.authenticatedUserId
    const reviewId = req.params.id
    
    // const alreadyLiked = await findLike(userId, reviewId)
    // if (alreadyLiked) {
    //     console.log(alreadyLiked)
    //     return res.status(400).json({Type: "Like", message: "Already Liked!" })
    // }

    const reviewExists = await findReviewById(reviewId)
    if (!reviewExists){
        return res.status(400).json({Type:"Review", message:"Review does not exist!"})
    }
    try {
        const updatedReview  = await dislike(reviewExists._id,userId)
        
        return res.status(200).json(updatedReview)
    }
    catch(err) {
        return res.status(400).json({Error: err, message: "An error occured!"})
    }
}
const HttpGetReviews = async (req,res) => {
    const reviews = await getReviews()
    try { 

        return res.status(200).json(reviews)
    }
    catch(err) {
        return res.status(400).json({Error: err, message: "An error occured!"})
    }
}

module.exports = {
    HttpCreateReview,
    HttpUpdateLikes,
    HttpGetReviews,
    HttpDislike
}