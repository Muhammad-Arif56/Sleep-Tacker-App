const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRoutes')
const sleepRouter = require('./routes/sleepRoutes')



require('./db/connection.js')
const app = express()
//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/user/sleep', sleepRouter)



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running at port :  ${port} `);
})






//
