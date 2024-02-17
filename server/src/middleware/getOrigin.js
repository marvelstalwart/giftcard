const getRequestOrigin = (req, res, next) => {
 
    const app = req.query.app
    req.session.app = app
  

    next()
}
module.exports = {
    getRequestOrigin
}