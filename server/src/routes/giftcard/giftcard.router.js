const express = require('express')
const {HttpGetGiftCards, HttpAddGiftCard, HttpValidateGiftCard, HttpGiftCardDownload, 
HttpGetUserGiftCards
} = require('./giftcard.controller');
const protect = require('../../middleware/auth');
const giftcardRouter = express.Router()

giftcardRouter.route('/').get(HttpGetGiftCards).post( protect, HttpAddGiftCard);
giftcardRouter.get('/:id', protect, HttpGetUserGiftCards)
giftcardRouter.post('/validate', protect, HttpValidateGiftCard)
giftcardRouter.get(':id/download', HttpGiftCardDownload)
giftcardRouter.get('/orders', protect)

module.exports = giftcardRouter