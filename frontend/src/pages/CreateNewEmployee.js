import { Link } from 'react-router-dom'
import { useEffect, useState} from 'react'

//components
import EmployeeForm from '../components/EmployeeForm'

const CreateNewEmployee = () => {

    return(
        <div>
            <EmployeeForm/>
        </div>
    )
}

export default CreateNewEmployee