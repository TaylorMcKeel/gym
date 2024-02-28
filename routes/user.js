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

router.route('/')
  .get(getUsers)
  .post(createUser)
  .delete(deleteUsers)

router.route('/login')
  .post(login)

router.route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)


module.exports = router