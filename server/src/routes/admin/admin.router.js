const express = require("express")
const adminRouter = express.Router()
const { HttpCreateNewAdmin, HttpUpdateOrderInformation} = require('./admin.controller')
const protect= require("../../middleware/auth")

adminRouter.post('/create', protect, HttpCreateNewAdmin)
adminRouter.put('/order',protect, HttpUpdateOrderInformation)
module.exports = adminRouter