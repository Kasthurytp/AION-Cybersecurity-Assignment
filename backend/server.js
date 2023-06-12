require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const employeeRoutes = require('./routes/employees')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/employees', employeeRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('listening on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })




