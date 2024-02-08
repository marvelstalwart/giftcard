const GiftCard = require('../../models/GiftCard')

const HttpGetGiftCards = async (req, res) => {
    try {
      const giftCards = await GiftCard.find();
      res.json(giftCards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const HttpAddGiftCard = async (req, res) => {
    const { code, balance } = req.body;
  
    try {
      const newGiftCard = new GiftCard({ code, balance });
      await newGiftCard.save();
      res.json(newGiftCard);
    } catch (error) {
      res.status(500).json({ error: error.message });
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

  const HttpSendEmail = async (req, res) => {
    try {
      const giftCard = await GiftCard.findById(req.params.id);
      const {fullName, email, message} = req.body
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
        to: email,
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
  }
  module.exports = {
    HttpGetGiftCards,
    HttpAddGiftCard,
    HttpGiftCardDownload,
    HttpSendEmail
  }