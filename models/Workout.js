const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
  title:{
    type: String,
    unique: false,
    required: true,
    maxLength: 15
  },
  duration:{
    type: Number,
    unique: false,
    required: false
  },
  creator:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Workout', WorkoutSchema)