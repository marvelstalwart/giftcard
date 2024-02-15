const giftCardSchema = require('../models/GiftCard')

async function updateGiftCardInformation (giftCardId) {

    try {
       return await giftCardSchema.findByIdAndUpdate(giftCardId, {
            status: "completed"
        })

    }catch(err){
        throw new Error(err)
    }

}

async function findGiftCardById(id){
    try {
       return await giftCardSchema.findById(id)
    }
    catch(err){
        throw new Error(err)
    }
}

async function validateGiftCard(code) {
    try {
        return await giftCardSchema.findOne({
            code,
            status:"completed"
        })
    }
    catch(err){
        throw new Error(err)
    }
}

async function getUserGiftCards (id) {
    try {
        return await giftCardSchema.find({
            createdBy: id
        })
    }
    catch(err){
        throw new Error(err)
    }
}

async function getGiftCardDetails (id) {
    try {
        return await giftCardSchema.findById(id).populate('createdBy')
    }
    catch(err){
        throw new Error(err)
    }

}

module.exports = {
    updateGiftCardInformation,
    findGiftCardById,
    validateGiftCard,
    getUserGiftCards,
    getGiftCardDetails

}