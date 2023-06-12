import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import plusImage from '../assets/plus.png';
import searchImage from '../assets/search.png';
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from '../components/Navbar'

//components
import EmployeeDetails from '../components/EmployeeDetails'
import EmployeeForm from '../components/EmployeeForm'

const Home = () => {
    const {employees, dispatch} = useEmployeesContext()
    const {user} = useAuthContext()
    
    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/employees', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_EMPLOYEES', payload: json})
            }
        }
        if(user) {
            fetchEmployees()
        }
    }, [dispatch, user])

    return(
        <div className="home">
        <Navbar/>
            <div className="employees">
                <div className="homeHeader">
                    <h1>Employees</h1>
                    <div className="te">
                        <button className="searchNewUserBtn"><img src={searchImage} alt="searchImg" className="searchUserBtnIcon"/>Search Employee</button>
                        <Link to="/createNewEmployee">
                            <button className="createNewUserBtn"><img src={plusImage} alt="plusImg" className="createNewUserBtnIcon"/>Create New Employee</button>
                        </Link>
                    </div>
                </div>
                <div className="employee-details" id="employee-details-container">
                    <p>Employee ID</p>
                    <p>Name</p>
                    <p>Email</p>
                    <p>NIC</p>
                    <p>Role</p>
                    <p>Salary</p>
                    <p>Action</p>  
                </div>
    
                {employees && employees.map((employee) => (
                            <EmployeeDetails key={employee._id} employee={employee} />
                        ))}
                        
            </div>
        </div>
    )
}

export default Home