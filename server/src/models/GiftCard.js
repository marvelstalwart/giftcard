const mongoose = require('mongoose')

const giftCardSchema = new mongoose.Schema({
    code: String,
    balance: Number,
    message: String, // Add message field
  
  });

  const GiftCard = mongoose.model('GiftCard', giftCardSchema);

  module.exports = GiftCard