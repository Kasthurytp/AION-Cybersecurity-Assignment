const express = require ('express')
const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee
} = require('../controllers/employeeController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all employee routes
router.use(requireAuth)

//get all employees
router.get('/', getEmployees)

//get an employee
router.get('/:id', getEmployee)

//post a new employee
router.post('/', createEmployee)

//delete a new employee
router.delete('/:id', deleteEmployee)

//update a new employee
router.patch('/:id', updateEmployee)

module.exports = router