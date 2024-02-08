const passport = require('passport')
const express =require('express')
const app = express()

const GoogleStrategy = require('passport-google-oidc')

const AUTH_OPTIONS = {
    callbackURL:'/api/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope:['profile', 'email']
  }
  
  function verifyCallback(issuer, profile, cb){
    console.log("Profile Information")
    console.log(profile)
    // TODO Save to database
    cb(null, profile)
}
app.use(passport.initialize())
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback))

