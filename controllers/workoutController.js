const { default: logger } = require('redux-logger')
const Workout = require('../models/Workout')


//To-Do: use req.user from protected route to get the user's workouts.. can get rid of filter.
const getWorkouts = async(req,res,next)=>{
  const filter = {}
  const options = {}
  
  if(Object.keys(req.query).length){
    const {
      creator,
      title,
      sortByDuration,
      limit
    } = req.params

    if(creator) filter.creator = true
    if(title) filter.title = true

    if(limit) options.limit = limit
    if(sortByDuration) options.sort = {
      duration: sortByDuration,
    }

    for(const query in filter){
      console.log(`Searching by ${query}`)
    }
  }

  try {
    const result = await Workout.find({}, filter, options)
    logger.info(`Found ${result.length} workouts :: getWorkouts, workoutController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error('Unable to get all workouts :: getWorkouts, workoutController.js')
    next(err)
  }
}

const getUserWorkouts = async(req,res,next)=>{

  try {
    const result = await Workout.find({creator: req.userId})
    logger.info(`Found ${result.length} workouts for user with id ${req.userId} :: getUserWorkouts, workoutController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to get workouts for user with id ${req.userId} :: getUserWorkouts, workoutController.js`)
    next(err)
  }

}

const createWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.create(req.body)
    logger.info(`Created new workout with id of ${result._id} :: createWorkout, workoutController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error('Unable to create workout :: createWorkout, workoutController.js')
    next(err)
  }
}

const deleteWorkouts = async(req,res,next)=>{
  try {
    const result = await Workout.deleteMany()
    logger.info('Deleted all workouts :: deleteWorkouts, workoutController.js')
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error('Unable to delete all workouts :: deleteWorkouts, workoutController.js')
    next(err)
  }
}


// /workout/:workoutId

const getWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.findById(req.params.workoutId)
    logger.info(`Found workout with id of ${result._id} :: getWorkout, workoutController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to get workout using workoutID ${req.params.workoutId} :: getWorkout, workoutController.js`)
    next(err)
  }
}

const updateWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.findByIdAndUpdate(req.params.workoutId, req.body, {new:true})
    logger.info(`Updated workout with id of ${req.params.workoutId} :: updateWorkout, workoutController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to update workout with id of ${req.params.workoutId} :: updateWorkout, workoutController.js`)
    next(err)
  }
}

const deleteWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.findByIdAndDelete(req.parama.workoutId)
    logger.info(`Deleted workout with id of ${req.params.workoutId} :: deleteWorkout, workoutController.js`)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    logger.error(`Unable to delete workout with id of ${req.params.workoutId} :: deleteWorkout, workoutController.js`)
    next(err)
  }
}

module.exports = {
  getWorkouts,
  deleteWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  getUserWorkouts
}