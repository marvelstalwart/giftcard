const express = require('express')
const {HttpGetGiftCards, HttpAddGiftCard, HttpGiftCardDownload, HttpSendEmail} = require('./giftcard.controller')
const giftcardRouter = express.Router()

giftcardRouter.route('/').get(HttpGetGiftCards).post(HttpAddGiftCard);
giftcardRouter.get(':id/download', HttpGiftCardDownload)
giftcardRouter.post(':id/send-email', HttpSendEmail)

module.exports = giftcardRouter