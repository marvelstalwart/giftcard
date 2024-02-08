const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

const dotenv  = require('dotenv');
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session)

dotenv.config()
const app = express();
const api = require('./routes/api')
const PORT = process.env.PORT || 5000;
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mern.afeank9.mongodb.net/giftCardApp`
//Session store
const store = new MongoDBStore({
 uri: MONGO_URL,
 collection: 'mySessions'
})

store.on('error', function(error) {
  console.log(error);
});
//Express session
app.use(session({
  secret:"This is a secret",
  cookie:{
    maxAge: 1000 * 60 * 60 * 24
  },
  store: store,
  resave: true,
  saveUninitialized: true
}))




// Middleware
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));


app.use(express.json());
//Endpoints
app.use('/api', api)
// MongoDB connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log("Connected to DB"))
.catch((err)=> console.error(err))
;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});