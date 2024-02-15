const mongoose = require("mongoose")


const OrdersSchema = new mongoose.Schema({
    orderId: {type: Number, required: true, unique: true},
    purchaser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true},
    paid: {type: Boolean, required: true, default:false},
    giftCardId: {type: mongoose.Schema.Types.ObjectId, ref:'giftcards', required: true}
})

const OrderSchema = mongoose.model('Orders', OrdersSchema)
module.exports = OrderSchema