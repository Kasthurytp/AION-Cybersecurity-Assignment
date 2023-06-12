import React, { useState } from 'react';
import Modal from 'react-modal';
import editingImage from '../assets/editing.png';
import deleteImage from '../assets/delete.png';
import { useEmployeesContext } from "../hooks/useEmployeesContext";
import { useAuthContext} from '../hooks/useAuthContext'

const EmployeeDetails = ({ employee }) => {
  const { dispatch } = useEmployeesContext();
  const {user} = useAuthContext()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);

  const handleClick = async () => {

    if(!user) {
      return
    }

    const response = await fetch('/api/employees/' + employee._id, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_EMPLOYEE', payload: json });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveEdit = () => {
    // Perform the API call or update logic here to save the editedEmployee state
    setDialogOpen(false);
  };
  

  const handleEditClick = () => {
    // Handle edit click logic here
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    handleClick();
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEditCloseDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <div className="employee-details" id="employee-details-details">
      <p>{employee.employeeId}</p>
      <p>{employee.name}</p>
      <p>{employee.email}</p>
      <p>{employee.nic}</p>
      <p>{employee.role}</p>
      <p>{employee.salary}</p>
      <p>
        <span onClick={handleEditClick}>
          <img src={editingImage} alt="editingImg" className="actionIcon" />
        </span>
      
        <span onClick={handleDeleteClick}>
          <img src={deleteImage} alt="deleteImg" className="actionIcon" />
        </span>
      </p>

      <Modal
        isOpen={isDialogOpen}
        onRequestClose={handleCloseDialog}
        className="popup-dialog"
        overlayClassName="popup-overlay"
        ariaHideApp={false}
      >
        <p className="deleteEmployeePopupTitle">Confirmation</p>
        <p className="deleteEmployeeConformation">Are you sure you want to delete this employee?</p>
        <div className="popup-buttons">
          <button className="deleteEmployeeBtn" onClick={handleConfirmDelete}>Yes</button>
          <button className="deleteCancelBtn" onClick={handleCloseDialog}>No</button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditDialogOpen}
        onRequestClose={handleEditCloseDialog}
        className="edit-popup-dialog"
        overlayClassName="popup-overlay"
        ariaHideApp={false}
      >
        <h2>Edit Employee</h2>
        <form className="editEmployeeForm">
            <label>Employee ID:</label>
            <input type="text" name="employeeId" value={editedEmployee.employeeId} disabled />

            <label>Name:</label>
            <input type="text" name="name" value={editedEmployee.name} onChange={handleInputChange} />

            <label>Email:</label>
            <input type="email" name="email" value={editedEmployee.email} onChange={handleInputChange} />

            <label>NIC:</label>
            <input type="text" name="nic" value={editedEmployee.nic} onChange={handleInputChange} />

            <label>Role:</label>
            <input type="text" name="role" value={editedEmployee.role} onChange={handleInputChange} />

            <label>Salary:</label>
            <input type="number" name="salary" value={editedEmployee.salary} onChange={handleInputChange} />

            <div className="editConatinerBtn">
              <button className="editPopupSaveBtn" type="submit">Save</button>
              <button className="editPopupCancelBtn" onClick={handleEditCloseDialog}>Cancel</button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
