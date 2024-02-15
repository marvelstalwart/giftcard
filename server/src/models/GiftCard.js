const mongoose = require('mongoose')

const giftCardSchema = new mongoose.Schema({
    code: {type: String, required: true},
    amount: Number,
    message: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    for: String,
    email: String,
    date: Date,
    status: {
      type: String, required: true,
      default: "processing"
    }
  });
 
  const GiftCard = mongoose.model('giftcards', giftCardSchema);

  module.exports = GiftCard