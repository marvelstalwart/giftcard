const jwt = require('jsonwebtoken')


 const protect = async (req,res, next)=> {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token
            console.log(req.headers)
            token = req.headers.authorization.split(' ')[1]
      
           const decoded =  jwt.verify(token, process.env.SECRET_KEY)
           req.authenticatedUserId = decoded.id
            next()
        }
        catch(err) {
            console.log(err)
            return res.status(401).json({type:"Authorization", message:"Unathorized!"})
        }
    }

    if (!token) {
        return res.status(401).json({type:"Authorization", message:"No token!"})
    }

   
}

module.exports = protect