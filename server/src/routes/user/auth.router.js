const express = require('express')
const authRouter = express.Router()
const passport = require('passport')
const userSchema = require('../../models/UserSchema')
const app = express()
const {HttpGoogleRes, HttpGoogleCallback, 
    HttpGoogleSuccess, HttpGoogleFailure,
    HttpAddUser,
    HttpLoginUser
} = require('./auth.controller')
const jwt = require("jsonwebtoken")
const GoogleStrategy = require('passport-google-oidc')
const { generateToken } = require('../../utils/generateToken')
const protect = require('../../middleware/auth')
const { HttpGetUserOrders } = require('../giftcard/giftcard.controller')
const __isProd__ = process.env.NODE_ENV === "production"
  const host = __isProd__ ? "https://giftcard-server.onrender.com" : "http://localhost:3000"
const AUTH_OPTIONS = {
  
    callbackURL:`${host}/api/auth/google/callback`,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENUIT_SECRET,
    scope:['profile', 'email']
  }
  
  async function verifyCallback (issuer, profile, cb){
    console.log("Profile Information")
    console.log(profile)
    // TODO Save to database
    
    try {
      
      let user = await userSchema.findOne({email: profile.emails[0].value})
    if (!user) {
        user = new userSchema({
          fullname: profile.name.familyName + " " + profile.name.givenName,
          email: profile.emails[0].value


        })
      
          await user.save()
        
       
    }
      user = {fullName: user.fullname, id: user._id, email: user.email, role: user.role, token: generateToken(user._id)}
      const token = jwt.sign(user, process.env.SECRET_KEY)
    cb(null, token)

}
   catch(err) {
    cb(err)
  }
  }

app.use(passport.initialize())
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback))





authRouter.get('/google',passport.authenticate('google'), HttpGoogleRes )
authRouter.get('/google/callback', passport.authenticate('google',{
    session: false
  }), HttpGoogleCallback)

  authRouter.get('/google/success', HttpGoogleSuccess )
  authRouter.get('/google/failure', HttpGoogleFailure)

authRouter.post("/user/reg",HttpAddUser)
authRouter.post("/user/login",HttpLoginUser)
authRouter.get("/user/orders", protect, HttpGetUserOrders)
module.exports = authRouter