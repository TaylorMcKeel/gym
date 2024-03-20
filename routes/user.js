const express = require('express')
const router = express.Router()

const {
  getUsers,
  createUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser,
  login
} = require('../controllers/userController')

const protectedRoute = require('../middlewares/auth')

router.route('/')
  .get(getUsers)
  .post(createUser)
  .delete(deleteUsers)

router.route('/login')
  .post(login)

router.route('/:userId')
  .get(protectedRoute, getUser)
  .put(protectedRoute, updateUser)
  .delete(protectedRoute, deleteUser)


module.exports = router