const express = require("express")
const api = express.Router()
const giftCardRouter = require('./giftcard/giftcard.router')
const authRouter = require('./user/auth.router')
api.use("/gift-card", giftCardRouter)
api.use("/auth", authRouter)


module.exports = api