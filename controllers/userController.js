const User = require('../models/User')

const CONVERT_TO_MILLISECONDS = 24 * 60 * 60 * 1000

const getUsers = async(req,res,next)=>{
  const filter = {}
  const options = {}


  // /user endpoint
  if(Object.keys(req.params).length){
    const{ //pulls any potential queries
      userName,
      firstName,
      lastName,
      email,
      limit,
      sortByUserName
    } = req.params
    //filters
    if(userName) filter.userName = true
    if(firstName) filter.firstName = true
    if(lastName) filter.lastName = true
    if(email) filter.email = true

    //sorting and pagenation
    if(limit) options.limit = limit //checks for pagenation
    if(sortByUserName) options.sort = {
      userName: sortByUserName //will return asc or des; 1/-1; ascending/descending
    }

    for(const query in filter){
      console.log(`Searching by ${query}`)
    }
  }

  try {
    const result = await User.find({},filter,options)
    res
    .status(200)
    .setHeader('Content-Typer','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const createUser = async(req,res,next)=>{
  try {
    const result = await User.create(req.body)
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteUsers = async(req,res,next)=>{
  try {
    const result = await User.deleteMany()
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}


// /user/:userId endpoints

const getUser = async(req,res,next)=>{
  try {
    const result = await User.findById(req.params.userId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const updateUser = async(req,res,next)=>{
  try {
    const result = await User.findByIdAndUpdate(req.params.userId, req.body,{new:true}) //takes id, new body, new tells it to send new document not the old one
    res
    .status(200)
    .setHeader('Content-Tye','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteUser = async(req,res,next)=>{
  try {
    const result = await User.findByIdAndDelete(req.params.userId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const login = async (req,res,next)=>{
  const {email, password} = req.body
  if( !email || !password){
    throw new Error('Please provide an email and password')
  }

  const user = await User.findOne({email}).select('+passowrd') //finds user based on email and only returns the password

  if(!user){
    throw new Error('User does not exist')
  }

  const passwordsMatch = await user.matchPasswords(password)
  if(!passwordsMatch){
    throw new Error('Password is incorrect')
  }

  sendTokenResponse(user, 200, res)
}

//To-Do: Add endpoints for forgot and reset password

const sendTokenResponse = (user, statusCode, res)=>{
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * CONVERT_TO_MILLISECONDS),
    httpOnly: true,
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json(token)
}


module.exports = {
  getUsers,
  createUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser,
  login
}