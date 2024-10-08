const Exercise = require('../models/Exercise')
const logger = require('./utils/logger')

//To-Do: use req.user from protected route to get the user's exercises.. can get rid of filter.
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
    logger.error(`Unable to get all exercises :: getExercises, exercisecontroller.js`)
    next(err)
  }
}

const getUserExercises = async(req,res,next)=>{

  try {
    
    const result = await Exercise.find({creator: req.userId})
    logger.info(`Found ${result.length} exercises for user with id ${req.userId} :: getUserExercises, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to get exercises for user with id ${req.userId} :: getUserExercises, exercisecontroller.js`)
    next(err)
  }

}


const createExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.create(req.body)
    logger.info(`Created new exercise with id of ${result._id} :: createExercise, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to create exercise :: createExercise, exercisecontroller.js`)
    next(err)
  }
}

const deleteExercises = async(req,res,next)=>{
  try {
    const result = await Exercise.deleteMany()
    logger.info(`Deleted all exercises :: deleteExercises, exercisecontroller.js`)
    res
    .status(202)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to delete all exercises :: deleteExercises, exercisecontroller.js`)
    next(err)
  }
}

// /exercise/:exerciseId

const getExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    logger.info(`Found exercise with id of ${result._id} :: getExercise, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to get exercise with id of ${req.params.exerciseId} :: getExercise, exercisecontroller.js`)
    next(err)
  }
}

const updateExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.findByIdAndUpdate(req.params.exerciseId, req.body, {new: true})
    logger.info(`Updated exercise with id of ${result._id} :: updateExercise, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to update exercise with id of ${req.params.exerciseId} :: updateExercise, exercisecontroller.js`)
    next(err)
  }
}

const deleteExercise = async(req,res,next)=>{
  try {
    const result = await Exercise.findByIdAndDelete(req.params.exerciseId)
    logger.info(`Deleted exercise with id of ${result._id} :: deleteExercise, exercisecontroller.js`)
    res
    .status(202)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to delete exercise with id of ${req.params.exerciseId} :: deleteExercise, exercisecontroller.js`)
    next(err)
  }
}

// /exercise/:exerciseId/stats

const getExerciseStats = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    logger.info(`Found ${result.stats.length} stats for exercise with id of ${result._id} :: getExerciseStats, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.stats)
  } catch (err) {
    logger.error(`Unable to get stats for exercise with id of ${req.params.exerciseId} :: getExerciseStats, exercisecontroller.js`)
    next(err)
  }
}

const deleteExerciseStats = async(req,res,next)=>{
  try {
    const result = await Exercise.findByIdAndDelete(req.params.exerciseId) 
    result.stats=[]
    await result.save()
    logger.info(`Deleted all stats for exercise with id of ${req.params.id} :: deleteExerciseStats, exercisecontroller.js`)
    res
    .status(202)
    .setHeader('Content-Type','application/json')
    .json({message: `Deleted all stats for exercise id of ${req.params.id}`})
  } catch (err) {
    logger.error(`Unable to delete all stats for exercise with id of ${req.params.id} :: deleteExerciseStats, exercisecontroller.js`) 
    next(err)
  }
}

const createExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    result.stats.push(req.body)
    await result.save()
    logger.info(`Created new stat for exercise with id of ${result._id} :: createExerciseStat, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result.stats)
  } catch (err) {
    logger.error(`Unable to create stat for exercise with id of ${req.params.exerciseId} :: createExerciseStat, exercisecontroller.js`)
    next(err)
  }
}

// /exercise/:exerciseId/stats/:statId

const getExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    let stat = result.stats.find(stat => (stat._id).equals(req.params.statId))
    if(!stat) stat = {message: `No stat found with id ${req.params.statId}`}
    logger.info(`Found stat with id of ${stat._id} for exercise with id of ${result._id} :: getExerciseStat, exercisecontroller.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(stat)
  } catch (err) {
    logger.error(`Unable to get stat with id ${req.params.statId} for exercise with id ${req.params.exerciseId} :: getExerciseStat, exercisecontroller.js`)
    next(err)
  }
}

const updateExerciseStat = async(req,res,next)=>{
  try {
    const result = await Exercise.findById(req.params.exerciseId)
    let stat = result.stats.find(stat => (stat._id).equals(req.params.statId))
    if(stat.length){
      const statIndexPosition = result.stats.indexOf(stat)
      result.stats.splice(statIndexPosition,1,req.body)
      stat = req.body
      await result.save()
      logger.info(`Updated stat with id of ${stat._id} for exercise with id of ${result._id} :: updateExerciseStat, exercisecontroller.js`)
    }else{
      logger.info(`No stat found with stat id ${req.params.statId} and exercise id ${req.params.exerciseId} :: updateExerciseStat, exercisecontroller.js`);
    
    }
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(stat)
  } catch (err) {
    logger.error(`Unable to update stat with id ${req.params.statId} for  exercise with id ${req.params.exerciseId} :: updateExerciseStat, exercisecontroller.js`)
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
      stat = {message: `Successfully deleted stat with id ${req.params.statId}`}
      await result.save()
      logger.info(`Deleted stat with id of ${req.params.statId} for exercise with id of ${result._id} :: deleteExerciseStat, exercisecontroller.js`)
    }else{
      //same question as above.. should logger.error go here?
      stat = {message: `No stat found with id ${req.params.statId}`}
    }
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(stat)
  } catch (err) {
    logger.error(`Unable to delete stat with id ${req.params.statId} for exercise with id ${req.params.exerciseId} :: deleteExerciseStat, exercisecontroller.js`)
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
  deleteExerciseStat,
  getUserExercises
}