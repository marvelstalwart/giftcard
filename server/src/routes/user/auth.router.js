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

const AUTH_OPTIONS = {
    callbackURL:'/api/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope:['profile', 'email']
  }
  
  async function verifyCallback (issuer, profile, cb){
    console.log("Profile Information")
    console.log(profile)
    // TODO Save to database
    const userExists = await userSchema.findOne({email: profile.emails[0].value})
    if (!userExists) {
        const newUser = new userSchema({
          fullname: profile.name.familyName + " " + profile.name.givenName,
          email: profile.emails[0].value


        })
        try {
          await newUser.save()
        }
        catch(err) {
          throw new Error (`An error occured while creating user + ${err}`)
        }
    }
  
      const token = jwt.sign(profile, process.env.SECRET_KEY)
    cb(null, token)
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

module.exports = authRouter