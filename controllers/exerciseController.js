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