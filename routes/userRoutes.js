const express = require('express')
const { signup, signin, getUsers, deleteUser, upload } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/signup', upload.single('profile'), signup)

userRouter.post('/signin', signin)
userRouter.get('/', getUsers)
userRouter.delete('/', deleteUser)



module.exports = userRouter