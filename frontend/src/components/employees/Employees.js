import React from "react";
import PropTypes from "prop-types";
import EmployeesTable from "./EmployeesTable";
import AddEmployeeRightPanel from "./AddEmployeeRightPanel";

const Employees = ({ employees, addEmployee, removeEmployee }) => {
  return (
    <div className="container">
      <div className="row">
        <AddEmployeeRightPanel addEmployee={addEmployee} employees={employees} />
        <div className="col-md-8">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">Employees</h4>
            </div>
            <EmployeesTable employees={employees} removeEmployee={removeEmployee} />
          </div>
        </div>
      </div>
    </div>
  );
};

Employees.propTypes = {
  employees: PropTypes.array.isRequired,
  addEmployee: PropTypes.func.isRequired,
  removeEmployee: PropTypes.func.isRequired
};

export default Employees;
