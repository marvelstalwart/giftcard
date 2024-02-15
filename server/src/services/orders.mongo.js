const OrderSchema = require('../models/OrdersSchema')
const OrdersSchema  = require('../models/OrdersSchema')
const {generateOrderId} =  require('../utils/uuid')
async function createNewOrder (id, amount, giftCardId){

    const orderDetails = new OrdersSchema({
        orderId: generateOrderId(),
        purchaser: id,
        amount,
        giftCardId
      })
      try {
      await orderDetails.save()
      return orderDetails.orderId
      }catch(err){
        throw new Error(err)
      }
}

async function findOrderByOrderId (orderId) {

  try {
    return await OrderSchema.findOne({
      orderId
    })
  }
  catch(err) {
    throw new Error(err)
  }
}

async function updateOrderInformation(orderId) {
  try {
      return await OrderSchema.updateOne(
          { orderId: orderId }, // Query condition: find the order with the specified orderId
          { $set: { paid: true } } // Update: set the paid field to true
      );
  } catch (err) {
      throw new Error(err);
  }
}

async function getUserOrders(userId) {
    try{
      return await OrderSchema.find({purchaser: userId}).populate('giftCardId')
    }
    catch (err) {
      throw new Error(err);
  }
}

module.exports = {
    createNewOrder,
    findOrderByOrderId,
    updateOrderInformation,
    getUserOrders
}