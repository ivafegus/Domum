const express = require('express')
const router = express.Router()
const { getUsers, getUser, addUser, loginUser, updateUser, deleteUser } = require('../controllers/userController.js')

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', addUser)
router.post('/loginUser', loginUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router