const User = require('../models/User')
const jwt = require('jsonwebtoken')

const protectedRoute = async( req, res, next)=>{
  let token
  if(req.headers.cookie && req.headers.cookie.startsWith('token')){
    token = req.headers.cookie.split('=')[1]
    
  }
  if(!token){
    throw new Error('auth.js:: protectedRoute: Not authorized to access this route')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    req.userId = decoded.id
    next()
  } catch (err) {
    throw new Error(`Error processing the jwt token in protected route middleware. Error: ${err}`)
  }
}

module.exports = protectedRoute