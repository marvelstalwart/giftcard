const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:String,
    email: String,
    password: String,
    role: {type:String, default: 'user'}
  })
  
  const User = mongoose.model('users', userSchema)
  module.exports = User