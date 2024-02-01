const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});