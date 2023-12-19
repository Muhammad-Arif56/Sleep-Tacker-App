const express = require('express')
const auth = require('../middleware/auth.js')
const { createSleepEntry, getAllSleepTime, updateSleepEntry, deleteSleepEntry, sleepTimeBetweenTwoDates, signleDaySleepTime } = require('../controllers/sleepController')

const sleepRouter = express.Router()


// //Sleep Crud
sleepRouter.post('/', auth, createSleepEntry)

sleepRouter.get('/', auth, getAllSleepTime)

sleepRouter.put('/:id', auth, updateSleepEntry)

sleepRouter.delete('/:id', auth, deleteSleepEntry)

sleepRouter.post('/betweendate', auth, sleepTimeBetweenTwoDates)
sleepRouter.post('/day', auth, signleDaySleepTime)







module.exports = sleepRouter