const usersSchema = require('../models/UserSchema')

async function findUserById (id) {
    try {
        return await usersSchema.findById(id)

    }
    catch(err) {
        throw new Error(err)
    }
}

async function findAdminByEmail (email) {
    try {
         return await usersSchema.findOne({
                email,
                role: 'admin'
            })

    }
    catch(err){
        throw new Error(err)
    }
}

async function findAdminById (id) {
    try {
            return await usersSchema.findOne({
                _id: id,
                role: 'admin'
            })
    }
    catch(err){
        throw new Error(err)
    }
} 
async function createNewAdmin (email, password) {
    const newAdmin = new usersSchema({
        email,
        password,
        role:'admin'
    })
    try {
        return await newAdmin.save()
    }
    catch(err){
        throw new Error(err)
    }
}



module.exports = {
    findUserById,
    findAdminByEmail,
    findAdminById,
    createNewAdmin
}