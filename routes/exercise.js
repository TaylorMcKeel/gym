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
  deleteExerciseStat
} = require('../controllers/exerciseController')


router.route('/')
  .get(getExercises)
  .post(createExercise)
  .delete(deleteExercises)

router.route('/:exerciseId')
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise)

router.route('/:exerciseId/stats')
  .get(getExerciseStats)
  .post(createExerciseStat)
  .delete(deleteExerciseStats)

router.route('/:exerciseId/stats/:statId')
  .get(getExerciseStat)
  .put(updateExerciseStat)
  .delete(deleteExerciseStat)

module.exports = router