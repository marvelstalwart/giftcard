const UserSchema = require('../../models/UserSchema')

const HttpGoogleRes = (req, res)=> {
    console.log("Hit endpoint")
  res.send("Welcome to my server ")
  }

  const HttpGoogleCallback = (req, res)=> {
   const token = req.user
    const requestOrigin = req.session.app

    console.log("Google called us back!")
    console.log(requestOrigin)
    const __isProd__ = process.env.NODE_ENV === "production"

    const host = __isProd__  && requestOrigin ==="review"? "https://thegreatwall.onrender.com" :__isProd__  && requestOrigin ==="giftcard" ? "https://giftcard-roan.vercel.app" : "http://localhost:3000"
    return res.redirect(`${host}/${token}`)
    } 


    const HttpGoogleSuccess = (req,res)=> {
        return res.status(200).json({type:"Google", message:"Successfully logged In"})
      }
      const HttpGoogleFailure =  (req,res)=> {
        return res.status(400).json({type:"Google", message:"Failed to Login"})
      }

    const HttpAddUser = async (req,res)=> {
        const {fullname, email, password, role} = req.body
                const userExists = await UserSchema.findOne({email: email})
        if (userExists) {
            return res.status(400).json({type:'User', message:"User already Exists"})
        }

        // if (role && role.toLowerCase() !== "user") {
        //   return res.status(400).json({type:'User', message:"Invalid request!"})
        // }
        const newUser = new UserSchema({
            fullname,
            email,
            password,
            role
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