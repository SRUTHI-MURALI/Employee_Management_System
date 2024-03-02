import * as actionTypes from "../actionTypes/actionTypes";
import EmployeeApi from "../api/employeeApi";

export const getEmployees = (data) => ({
  type: actionTypes.GET_EMPLOYEES,
  data
});

export const addEmployee = (data) => ({
  type: actionTypes.ADD_EMPLOYEE,
  data
});

export const updateEmployee = (data) => ({
  type: actionTypes.UPDATE_EMPLOYEE,
  data
});

export const removeEmployee = (data) => ({
  type: actionTypes.CHANGE_STATUS,
  data
});

export const getEmployeesAsync = () => async (dispatch) => {
  try {
    const employees = await EmployeeApi.getEmployees();
    dispatch(getEmployees(employees.data));
  } catch (error) {
    console.error("Error while loading employees", error);
    throw error;
  }
};

export const addEmployeeAsync = (e, index) => async (dispatch) => {
  try {
    const employees = await EmployeeApi.addEmployee(e, index);
    dispatch(addEmployee(employees.data));
  } catch (error) {
    console.error("Error while adding new employee", error);
    throw error;
  }
};

export const removeEmployeeAsync = (row, date) => async (dispatch) => {
  try {
    const employees = await EmployeeApi.changeEmployeeStatus(row, date);
    dispatch(removeEmployee(employees.data));
  } catch (error) {
    console.error("Error while changing the status of an employee", error);
    throw error;
  }
};
