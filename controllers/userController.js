const User = require('../models/User')
const logger = require('./utils/logger')
const CONVERT_TO_MILLISECONDS = 24 * 60 * 60 * 1000


//To-Do: user req.user in order to grab the user for home page
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
    logger.info(`Found ${result.length} users :: getUsers, userController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to get all users :: getUsers, userController.js - Error ${err.message}`)
    next(err)
  }
}

const createUser = async(req,res,next)=>{
  try {
    const result = await User.create(req.body)
    logger.info(`Created new user with id of ${result._id} :: createUser, userController.js`)
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (err) {
    logger.error('Unable to create user :: createUser, userController.js')
    return res.status(400).json({ message: err.message }); //replaced next(err) with this line
  }
}

const deleteUsers = async(req,res,next)=>{
  try {
    const result = await User.deleteMany()
    logger.info(`Deleted all users :: deleteUsers, userController.js`)
    res
    .status(202)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error('Unable to delete all users :: deleteUsers, userController.js')
    next(err)
  }
}


// /user/:userId endpoints
//should i remove the userId from the params and use req.userId from the protected route? I have access to it there.
const getUser = async(req,res,next)=>{
  try {
    const result = await User.findById(req.userId)
    logger.info(`Found user with id of ${req.userId} :: getUser, userController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to get user using userID ${req.userId} :: getUser, userController.js`)
    next(err)
  }
}

const updateUser = async(req,res,next)=>{
  try {
    const result = await User.findByIdAndUpdate(req.params.userId, req.body,{new:true}) //takes id, new body, new tells it to send new document not the old one
    logger.info(`Updated user with id of ${req.params.userId} :: updateUser, userController.js`)
    res
    .status(200)
    .setHeader('Content-Tye','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to update user information for user with id ${req.params.userId} :: updateUser, userController.js `)
    next(err)
  }
}

const deleteUser = async(req,res,next)=>{
  try {
    const result = await User.findByIdAndDelete(req.params.userId)
    logger.info(`Deleted user with id of ${req.params.userId} :: deleteUser, userController.js`)
    res
    .status(202)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to delete user with id of ${req.params.userId} :: deleteUser, userController.js`)
    next(err)
  }
}

//not sure what exactly to log here.. shoudl I log errors for !user and paswordMatch and a success at the end if both pass?
const login = async (req,res,next)=>{
  const {email, password} = req.body
  if( !email || !password){
    throw new Error('Please provide an email and password')
  }

  const user = await User.findOne({email}).select('+passowrd') //finds user based on email and only returns the password

  if(!user){
    return res.status(401).json({ message: 'User does not exist' });
    // throw new Error('User does not exist')
  }

  const passwordsMatch = await user.matchPasswords(password)
  if(!passwordsMatch){
    
    return res.status(401).json({ message: 'Password is incorrect' });
    // throw new Error('Password is incorrect')
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
  logger.info(`User with id of ${user._id} has logged in :: sendTokenResponse, userController.js`)
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