const express = require("express")
const api = express.Router()
const adminRouter = require('./admin/admin.router')
const giftCardRouter = require('./giftcard/giftcard.router')
const authRouter = require('./user/auth.router')
api.use("/gift-card", giftCardRouter)
api.use("/auth", authRouter)
api.use("/admin", adminRouter)

module.exports = api