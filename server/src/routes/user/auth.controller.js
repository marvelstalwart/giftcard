const UserSchema = require('../../models/UserSchema')

const HttpGoogleRes = (req, res)=> {
    console.log("Hit endpoint")
  res.send("Welcome to my server ")
  }

  const HttpGoogleCallback = (req, res)=> {
   const token = req.user
 
    console.log("Google called us back!")
    return res.redirect(`http://localhost:3000/${token}`)
    } 


    const HttpGoogleSuccess = (req,res)=> {
        return res.status(200).json({type:"Google", message:"Successfully logged In"})
      }
      const HttpGoogleFailure =  (req,res)=> {
        return res.status(400).json({type:"Google", message:"Failed to Login"})
      }

    const HttpAddUser = async (req,res)=> {
        const {fullname, email, password} = req.body
                const userExists = await UserSchema.findOne({email: email})
        if (userExists) {
            return res.status(400).json({type:'User', message:"User already Exists"})
        }


        const newUser = new UserSchema({
            fullname,
            email,
            password
        })
        try {
            const resp = await newUser.save()
            return res.status(200).json({type:'User', data: resp, message:"Success"})
        }
        catch (err){
            return res.status(400).json({type:'User', error: err})
        }
    
    }

    const HttpLoginUser = async (req,res)=> {
         const {email, password} = req.body
         const userExists = await UserSchema.findOne({email: email})
         if (!userExists) {
             return res.status(400).json({type:'User',message: "User not found"})
         }
         if (password.toString() !== userExists.password) {
            return res.status(400).json({type:'User',message: "Password mismatch!"})
         }
         return res.status(200).json({type:"User", message: "Successfully logged In!", user: userExists})

    }
  module.exports = {
    HttpGoogleRes,
    HttpGoogleCallback,
    HttpGoogleSuccess,
    HttpGoogleFailure,
    HttpAddUser,
    HttpLoginUser
  }