const express = require('express')
const router = express.Router()

const {
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
} = require('../controllers/exerciseController')

const protectedRoute = require('../middlewares/auth')

router.route('/')
  .get(protectedRoute, getExercises)
  .post(protectedRoute, createExercise)
  .delete(protectedRoute, deleteExercises)

router.route('/userExercises')
  .get(protectedRoute, getUserExercises)

router.route('/:exerciseId')
  .get(protectedRoute, getExercise)
  .put(protectedRoute, updateExercise)
  .delete(protectedRoute, deleteExercise)

router.route('/:exerciseId/stats')
  .get(protectedRoute, getExerciseStats)
  .post(protectedRoute, createExerciseStat)
  .delete(protectedRoute, deleteExerciseStats)

router.route('/:exerciseId/stats/:statId')
  .get(protectedRoute, getExerciseStat)
  .put(protectedRoute, updateExerciseStat)
  .delete(protectedRoute, deleteExerciseStat)

module.exports = router