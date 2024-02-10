const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StatSchema = new Schema({
  weight:{
    type: Number,
    required: true
  },
  unit:{
    type: String,
    required: true,
    enum: ['KG','LBS'],
    maxLength: 3
  },
  date:{
    type: Date,
    required: true
  },
  notes:{
    type: String,
  }
},{
  timestamps: true
})



const ExerciseSchema = new Schema({
  title:{
    type: String,
    unique: false,
    required: true,
    maxLength: 20
  },
  category:{
    type: String,
    required: true,
    enum: ['ARMS', 'LEGS','CHEST','BACK','ABS']
  },
  workout:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  stats: [StatSchema]
},{
  timestamps: true
})


ExerciseSchema.pre('save', function(next){
  this.category = this.category.toUpperCase()
  next()
})

StatSchema.pre('save', function(next){
  this.unit = this.unit.toUpperCase()
  next()
})

module.exports = mongoose.model('Exercise', ExerciseSchema)