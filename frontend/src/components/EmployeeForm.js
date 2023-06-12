import {useState} from "react"
import { Link} from 'react-router-dom';
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import {useAuthContext} from '../hooks/useAuthContext'
import Navbar from "./Navbar";

const EmployeeForm = () => {
    const { dispatch } = useEmployeesContext()
    const {user} = useAuthContext()

    const [employeeId, setEmployeeId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nic, setNic] = useState('')
    const [role, setRole] = useState('')
    const [salary, setSalary] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        if (!validateEmail(email)) {
            setError('Invalid email');
            return;
          }

        const employee = {employeeId, name, email, nic, role, salary}

        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setEmployeeId('')
            setName('')
            setEmail('')
            setNic('')
            setRole('')
            setSalary('')
            setError(null)
            setEmptyFields([])
            console.log('New Employee Added', json)
            dispatch({type: 'CREATE_EMPLOYEE', payload: json})
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="createEmployeeContainer">
                <form className="createEmployee" onSubmit={handleSubmit}>
                    <h3 className="addNewEmployeeTitle">Add New Employee</h3>

                    <label>Employee ID</label><br></br>
                    <input type="text" onChange={(e) => setEmployeeId(e.target.value)} value={employeeId} className={emptyFields.includes('employeeId') ? 'error' : ''}/><br></br>

                    <label>Name</label><br></br>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className={emptyFields.includes('name') ? 'error' : ''}/><br></br>

                    <label>E- Mail</label><br></br>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className={emptyFields.includes('email') ? 'error' : ''}/><br></br>

                    <label>NIC</label><br></br>
                    <input type="text" onChange={(e) => setNic(e.target.value)} value={nic} className={emptyFields.includes('nic') ? 'error' : ''}/><br></br>

                    <label>Role</label><br></br>
                    <input type="text" onChange={(e) => setRole(e.target.value)} value={role} className={emptyFields.includes('role') ? 'error' : ''}/><br></br>

                    <label>Salary</label><br></br>
                    <input type="text" onChange={(e) => setSalary(e.target.value)} value={salary} className={emptyFields.includes('salary') ? 'error' : ''}/><br></br>

                    <div className="createEmployeeButtonContainer">
                    <Link to="/"> <button className="cancelCreateNewEmployeeBtn">Cancel</button></Link>
                        <button className="createNewEmployeeBtn">Create Employee</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm