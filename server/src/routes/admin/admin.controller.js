const {findAdminByEmail,
     findAdminById, createNewAdmin,
     

} = require('../../services/users.mongo')
const {updateOrderInformation, findOrderByOrderId} = require('../../services/orders.mongo')
const {updateGiftCardInformation, findGiftCardById, getGiftCardDetails} = require('../../services/giftcard.mongo')
const {hashPassword, comparePassword} = require('../../utils/bcrypt')

const {sendGiftCardToRecipient} = require("../../utils/mailer")

// Create new Admin
async function HttpCreateNewAdmin(req, res) {
const {email, password} = req.body
const id =   req.authenticatedUserId

const adminExists = await findAdminById(id)
if (!adminExists) {
    return res.status(401).json({type:"Admin", err: "Unauthorized!"})
}

const adminAlreadyExists = await findAdminByEmail(email)
if (adminAlreadyExists) {
    return res.status(400).json({type:"Admin", err:"Admin has already been created!"})

}
const hashedPassword = await hashPassword(password)
 
 try {
    const createdAdmin = await createNewAdmin(email, hashedPassword)
    return res.status(200).json(createdAdmin)
 }
 catch(err){
    return res.status(400).json({type:"admin", err: err})
 }
  



}

// Update Order Information 
async function HttpUpdateOrderInformation(req, res) {
        const {orderId} = req.body
     
        const id = req.authenticatedUserId
        const adminExists = await findAdminById(id)
        if (!adminExists) {
            return res.status(401).json({type:"Admin", err: "Unauthorized!"})
        }
        const order  = await findOrderByOrderId(orderId)
         if (!order) {
            return res.status(404).json({type:"Order", err: "Order not found!"})
         }      
         
         try {
            // Update order status to paid
            
            await updateOrderInformation(orderId)

            // Update Giftcard  Information 
            await updateGiftCardInformation(order.giftCardId) }
            catch(err){
                return res.status(400).json({type:"Giftcard", message:"Unable to update giftcard information", err})
            }
            // Send the giftCard to the recepient
             
                const giftCard = await getGiftCardDetails(order.giftCardId)
                if(giftCard) {
                    
                    try { 
                        sendGiftCardToRecipient(giftCard, res)
                    }
                    catch(err){
                        return res.status(400).json({type:"Giftcard", message:"Unable to send giftcard to recipient", err})
                    }

                    // return res.status(200).json({Type:"Giftcard", message:"Successfully sent!"})

                }
                else {
                    return res.status(404).json({Type: "Giftcard", message:"Not found!"})
                }

           


}


module.exports = {
    HttpCreateNewAdmin,
    HttpUpdateOrderInformation
}