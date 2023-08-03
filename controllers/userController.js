const User = require('../models/User')


const getUsers = async(req,res,next)=>{
  const filter = {}
  const options = {}


  // /category endpoint
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

module.exports = {
  getUsers,
  createUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser
}