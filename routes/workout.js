const express = require('express')
const router = express.Router()

const {
  getWorkouts,
  createWorkout,
  deleteWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  getUserWorkouts
} = require('../controllers/workoutController')

const protectedRoute = require('../middlewares/auth')

router.route('/')
  .get(protectedRoute, getWorkouts)
  .post(protectedRoute, createWorkout)
  .delete(protectedRoute, deleteWorkouts)

router.route('/userWorkouts')
  .get(protectedRoute, getUserWorkouts)
 

router.route('/:workoutId')
  .get(protectedRoute, getWorkout)
  .put(protectedRoute, updateWorkout)
  .delete(protectedRoute, deleteWorkout)

module.exports = router