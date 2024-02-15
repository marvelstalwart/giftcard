const GiftCard = require('../../models/GiftCard')
const {requestPaymentInformation} = require('../../utils/mailer')
const {generateGiftCard} = require('../../utils/uuid')
const orderSchema = require('../../models/OrdersSchema')
const {findAdminById} = require('../../services/users.mongo')
const {validateGiftCard, getUserGiftCards, getGiftCardDetails} = require('../../services/giftcard.mongo')
const {getUserOrders} = require("../../services/orders.mongo")
const HttpGetGiftCards = async (req, res) => {
    try {
      const giftCards = await GiftCard.find();
      res.json(giftCards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const HttpAddGiftCard = async (req, res) => {
    const id  = req.authenticatedUserId
    const {fullName, recepientEmail, senderEmail, senderName, message, date, amount} = req.body;
    console.log(recepientEmail, senderEmail)
    try {
      const newGiftCard = new GiftCard({ 
        for: fullName, email: recepientEmail,
         message, date, createdBy: id, amount,
         code: generateGiftCard()
      
        });
      
      const giftCard = await newGiftCard.save();
  
         
      try {

        requestPaymentInformation(
          senderName,
           senderEmail, 
           amount, res,
            id,
            giftCard._id
           
           )
      }
      catch(err) {
        return res.status(400).json(err)
      }
      return res.status(200).json(newGiftCard);
    } catch (error) {
     return res.status(500).json({ error: error.message });
    }
  }

  const HttpValidateGiftCard = async (req,res)=> {
      const {giftCardCode} =  req.body
      const id = req.authenticatedUserId
      const adminExists = await findAdminById(id)
      if (!adminExists) {
          return res.status(401).json({type:"Admin", err: "Unauthorized!"})
      }
      try {
          const isValidGiftCard = await validateGiftCard(giftCardCode)
            if (!isValidGiftCard){
             return res.status(400).json({message: "Invalid!"})
            }
            return res.status(200).json({message: "Valid!"})
     
        }
        catch(err){
         return res.status(400).json({message: "An error occured"})
        }
  }

  const HttpGiftCardDownload = async (req, res) => {
    try {
      const giftCard = await GiftCard.findById(req.params.id);
      if (!giftCard) {
        return res.status(404).json({ error: 'Gift card not found' });
      }
  
      const templatePath = path.join(__dirname, 'templates', 'giftCardTemplate.ejs');
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const html = ejs.render(templateContent, { giftCard });
  
      res.setHeader(`'Content-Disposition', attachment; filename=${giftCard.code}.jpeg`);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(html); // In a real app, you might want to use a library to convert HTML to an image
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const HttpGetUserGiftCards = async (req,res) =>{
      const id = req.authenticatedUserId
      
      const giftcards = await getUserGiftCards(id)
      return res.status(200).json(giftcards)
  } 
const HttpGetUserOrders = async (req,res)=> {
  const id = req.authenticatedUserId
  const orders = await getUserOrders(id)
  return res.status(200).json(orders)

}

  module.exports = {
    HttpGetGiftCards,
    HttpAddGiftCard,
    HttpGiftCardDownload,
    HttpValidateGiftCard,
    HttpGetUserGiftCards,
    HttpGetUserOrders
 
  }