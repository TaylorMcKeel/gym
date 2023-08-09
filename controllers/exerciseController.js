const Exercise = require('../models/Exercise')

const getExercises = async(req,res,next)=>{
  const filter ={}
  const options = {}

  if(Object.keys(req.query).length){
    const {
      workout,
      category,
      limit
    } = req.params

    if(workout) filter.workout = true
    if(category) filter.category = true

    if(limit)options.limit = limit
    for(const query in filter){
      console.log(`Searching by ${query}`)
    }
  }

  try {
    const result = await Exercise.find({},filter, options)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const createExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.create(req.body)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteExercises = async(req,res,next)=>{
  try {
    const result = await Exercise.deleteMany()
    res
    .status(200)
    .setHeader('Content-Type','applcation/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}


// /exercise/:exerciseId

const getExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const updateExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.findByIdAndUpdate(req.params.exerciseId, req.body, {new: true})
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.findByIdAndDelete(req.params.exerciseId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

// /exercise/:exerciseId/stats

const getExerciseStats = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.stats)
  } catch (err) {
    next(err)
  }
}

const deleteExerciseStats = async(req,res,next)=>{
  try {
    const result = await Exercise.findByIdAndDelete(req.params.exerciseId) 
    result.stats=[]
    await result.save()
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json({message: `Deleted all stats for exercise id of ${req.params.id}`})
  } catch (err) {
    next(err)
  }
}

const createExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    result.stats.push(req.body)
    await result.save()
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.stats)
  } catch (err) {
    next(err)
  }
}

// /exercise/:exerciseId/stats/:statId

const getExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    let stat = result.stats.find(stat => (stat._id).equals(req.params.statId))
    if(!stat) stat = {message: `No stat found with id ${req.params.statId}`}
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(stat)
  } catch (err) {
    next(err)
  }
}

const updateExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    let stat = result.stats.find(stat => (stat._id).equals(req.params.statId))
    if(stat){
      const statIndexPosition = result.stats.indexOf(stat)
      result.stats.splice(statIndexPosition,1,req.body)
      stat = req.body
      await result.save()
    }else{
      stat = {message: `No stat found with id ${req.params.statId}`}
    }
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(stat)
  } catch (err) {
    next(err)
  }
}

const deleteExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    let stat = result.stats.find(stat => (stat._id).equals(req.params.statId))
    if(stat){
      const statIndexPosition = result.stats.indexOf(stat)
      result.stats.splice(statIndexPosition,1)
      stat = {message: `Successfully delted stat with id ${req.params.statId}`}
      await result.save()
    }else{
      stat = {message: `No stat found with id ${req.params.statId}`}
    }
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(stat)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  getExercises,
  deleteExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getExerciseStats,
  createExerciseStat,
  deleteExerciseStats,
  getExerciseStat,
  updateExerciseStat,
  deleteExerciseStat
}