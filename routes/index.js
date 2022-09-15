const { Router } = require('express')
const { registration, authorization } = require('../controllers/auth')
const { getAllToDo, createToDo, deleteToDo } = require('../controllers/todo')
const verifyToken = require('../middleware/verify')
const router = Router()

router
  .post('/registration', registration)
  .post('/authorization', authorization)
  .get('/get-profile', verifyToken, (req, res) => {
    res.status(200).json(req.user)
  })

  // ToDo
  .get('/todo-list', verifyToken, getAllToDo)
  .post('/create-todo', verifyToken, createToDo)
  .delete('/delete-todo/:id', verifyToken, deleteToDo)

module.exports = router