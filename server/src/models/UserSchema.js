const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:String,
    email: String,
    password: String
  })
  
  const User = mongoose.model('Users', userSchema)
  module.exports = User