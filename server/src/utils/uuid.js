const {v4: uuidv4} = require('uuid')

function generateOrderId() {
  
    // Generate a UUID and extract the first 6 characters
    const uuid = uuidv4().replace(/\D/g, '').substring(0,6)
    return  uuid;

} 
function generateGiftCard(){
    const uuid1 = uuidv4().substring(0,3)
    const uuid2 = uuidv4().substring(0,3)
    const uuid3 = uuidv4().substring(0,3)
    const giftCardCode = uuid1 + '-' + uuid2 + '-' +uuid3 
    return  giftCardCode;
}
module.exports = {
 generateOrderId,
 generateGiftCard
}    
