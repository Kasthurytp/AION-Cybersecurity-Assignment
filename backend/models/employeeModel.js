const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    nic:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true,
        unique: true,
    },
    salary:{
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Employee', employeeSchema)
