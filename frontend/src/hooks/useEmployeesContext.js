import {EmployeesContext } from '../context/EmployeeContext'
import { useContext } from 'react'

export const useEmployeesContext = () => {
    const context = useContext(EmployeesContext)

    if (!context) {
        throw Error('useEmployeesContext must be used inside an EmployeesContextProvider')
    }

    return context
}