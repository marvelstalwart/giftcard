const nodemailer = require('nodemailer')
const ejs = require('ejs')
const fs = require('fs')
const path= require('path')
const generateOrderId = require('./uuid')
const templatePath = path.join(__dirname, '../templates/giftCardTemplate.ejs')
const templateString = fs.readFileSync(templatePath, 'utf-8')

const giftCardPath = path.join(__dirname, '../templates/GiftCard.ejs')
const giftCardString = fs.readFileSync(giftCardPath, 'utf-8')
const compiledGiftCard =  ejs.compile(giftCardString)

const compiledTemplate = ejs.compile(templateString)

const {createNewOrder} = require('../services/orders.mongo')
const transporter = nodemailer.createTransport({
    // Setup your email transporter here
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b9f7270f004ca9",
      pass: "5cb2111d4cd501",
    },
  });

//   const mailOptions = {
//     from: `${process.env.EMAIL}`,
//     to: email,
//     subject: 'Gift Card',
//     text: `Here is your gift card with code ${giftCard.code} and balance $${giftCard.balance}. Message: ${giftCard.message || 'No message'}`,
//   };
 
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Error sending email' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.json({ message: 'Email sent successfully' });
//     }
//   });






async function requestPaymentInformation (name, email, amount ,res, id, giftCardId) {

  // Save Order details to database
    const orderId = await createNewOrder(id, amount, giftCardId)

    const data = {
        name,
        amount,
        orderId
    }   
    const htmlContent = compiledTemplate(data)
    const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: 'Gift Card Payment',
        html: htmlContent
      }; 

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'Error sending email' });
        } else {
          console.log('Email sent:', info.response);
          res.json({ message: 'Email sent successfully' });
        }
      });

}

async function sendGiftCardToRecipient (giftCard, res) {
  
console.log(giftCard)
  const data = {
    name: giftCard.for,
    amount: giftCard.amount,
    message: giftCard.message,
    sender: giftCard.createdBy.fullname.split(" ")[1],
    code: giftCard.code
  }
  const html = compiledGiftCard(data)
  const mailOptions = {
    from: `${process.env.EMAIL}`,
    to: giftCard.email,
    subject: 'Gift Card Payment',
    html: html 
  }; 

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Order processed!' });
    }
  });
}
module.exports = {
    requestPaymentInformation,
    sendGiftCardToRecipient
}