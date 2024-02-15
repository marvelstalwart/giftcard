const bcrypt = require('bcrypt')
const saltRounds = 10

async function hashPassword (password) {
        return await bcrypt.hash(password, saltRounds)
}

async function comparePassword (password,hashedP) {

    return await bcrypt.compare(password, hashedP)
}

module.exports ={
    hashPassword,
    comparePassword
}    