var jwt = require('jsonwebtoken')
 require('dotenv').config()

function generateToken(id) {
       return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '10h'})
}

module.exports={
    generateToken
}