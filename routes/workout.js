const express = require('express')
const router = express.Router()

const {
  getWorkouts,
  createWorkout,
  deleteWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutController')

router.route('/')
  .get(getWorkouts)
  .post(createWorkout)
  .delete(deleteWorkouts)

router.route('/:workoutId')
  .get(getWorkout)
  .put(updateWorkout)
  .delete(deleteWorkout)

module.exports = router