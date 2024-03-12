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
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}


const createWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.create(req.body)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteWorkouts = async(req,res,next)=>{
  try {
    const result = await Workout.deleteMany()
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}


// /workout/:workoutId

const getWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.findById(req.params.workoutId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const updateWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.findByIdAndUpdate(req.params.workoutId, req.body, {new:true})
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

const deleteWorkout = async(req,res,next)=>{
  try {
    const result = await Workout.findByIdAndDelete(req.parama.workoutId)
    res
    .status(200)
    .setHeader('Content-Type','application/json')
    .json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getWorkouts,
  deleteWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout
}