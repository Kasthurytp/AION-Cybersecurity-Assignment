const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

//get all employees
const getEmployees = async (req, res) => {
    const employees = await Employee.find({}).sort({createAt: -1})

    res.status(200).json(employees)
}

//get a single employee
const getEmployee = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such employee'})
    }

    const employee = await Employee.findById(id) 

    if (!employee) {
        return res.status(400).json({error: "No such employee"})
    }

    res.status(200).json(employee)
}

//create new employee
const createEmployee = async (req, res) => {
    const {employeeId, name, email, nic, role, salary} = req.body

    let emptyFields = []

    if(!employeeId) {
        emptyFields.push('employeeId')
    }
    if(!name) {
        emptyFields.push('name')
    }
    if(!email) {
        emptyFields.push('email')
    }
    if(!nic) {
        emptyFields.push('nic')
    }
    if(!role) {
        emptyFields.push('role')
    }
    if(!salary) {
        emptyFields.push('salary')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json ({ error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        const employee = await Employee.create({employeeId, name, email, nic, role, salary})
        res.status(200).json(employee)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such employee'})
    }

    const employee = await Employee.findOneAndDelete({_id: id})

    if (!employee) {
        return res.status(400).json({error: "No such employee"})
    }

    res.status(200).json(employee)
}

//update a employee
const updateEmployee = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such employee'})
    } 

    const employee = await Employee.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!employee) {
        return res.status(400).json({error: "No such employee"})
    }

    res.status(200).json(employee)
}

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
}