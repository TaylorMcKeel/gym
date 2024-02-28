const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    maxLength: 10
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 12
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 12
  },
  email:{
    type: String,
    required: true,

  },
  password:{
    type: String,
    required: true,
    validate: (password)=> validator.isStrongPassword(password)
  },
},{
  timestamps: true
})

UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

UserSchema.pre('save', async function (next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(this.password, enteredPassword)
}
module.exports = mongoose.model('User', UserSchema)