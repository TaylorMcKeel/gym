const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

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

module.exports = mongoose.model('User', UserSchema)