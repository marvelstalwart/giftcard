const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

const dotenv  = require('dotenv')

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mern.afeank9.mongodb.net/giftCardApp`
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log("Connected to DB"))
.catch((err)=> console.error(err))
;

const giftCardSchema = new mongoose.Schema({
  code: String,
  balance: Number,
  message: String, // Add message field

});

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

// Routes
app.get('/api/gift-cards', async (req, res) => {
  try {
    const giftCards = await GiftCard.find();
    res.json(giftCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gift-cards', async (req, res) => {
  const { code, balance } = req.body;

  try {
    const newGiftCard = new GiftCard({ code, balance });
    await newGiftCard.save();
    res.json(newGiftCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gift-cards/:id/download', async (req, res) => {
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
  });
  
  app.post('/api/gift-cards/:id/send-email', async (req, res) => {
    try {
      const giftCard = await GiftCard.findById(req.params.id);
      if (!giftCard) {
        return res.status(404).json({ error: 'Gift card not found' });
      }
  
      const transporter = nodemailer.createTransport({
        // Setup your email transporter here
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
      });
  
      const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: 'recipient_email@example.com',
        subject: 'Gift Card',
        text: `Here is your gift card with code ${giftCard.code} and balance $${giftCard.balance}. Message: ${giftCard.message || 'No message'}`,
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});