import React from "react";
import PropTypes from "prop-types";
import { XCircle, CheckCircle } from "react-feather";
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import * as _ from "lodash";

const MySwal = withReactContent(Swal);

const EmployeesTable = ({ employees, removeEmployee }) => {
  const setEmployeeAsInactive = (rowNumber) => {
    const date = moment().format("MM-DD-YYYY"); // end-date
    MySwal.fire({
      title: "Set to inactive",
      text: "Do you want to set this employee as inactive?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        removeEmployee(rowNumber, date);
      }
    });
  };

  const setEmployeeAsActive = (rowNumber) => {
    MySwal.fire({
      title: "Set to active",
      text: "Do you want to set this employee as active?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        removeEmployee(rowNumber, "");
      }
    });
  };

  const newOrder = employees.map(emp => {
    return emp.enddate === "" ? { ...emp, enddate: undefined } : emp;
  });

  const sortedEmployees = _.orderBy(
    newOrder,
    ["enddate", "name"],
    ["desc", "asc"]
  );

  const listEmployees = sortedEmployees.map(item => (
    <tr key={item.jmbg}>
      <td>
        <Link to={`/employees/${item.jmbg}`}>{item.name}</Link>
      </td>
      <td>{item.surname}</td>
      <td>{item.position}</td>
      <td className="status-column">
        <i
          className={`fa fa-circle ${
            !item.enddate ? "employeeactive" : "employeeinactive"
          }`}
        ></i>
      </td>
      <td>
        {!item.enddate && (
          <button
            className="table-actions"
            title="Set the employee as inactive?"
            onClick={() => setEmployeeAsInactive(item.rowNumber)}
          >
            <XCircle size="18" />
          </button>
        )}
        {item.enddate && (
          <button
            className="table-actions"
            title="Set the employee as active, again?"
            onClick={() => setEmployeeAsActive(item.rowNumber)}
          >
            <CheckCircle size="18" color="lime" />
          </button>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="portlet-body">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Position</th>
            <th className="status-column">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{listEmployees}</tbody>
      </table>
    </div>
  );
};

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  removeEmployee: PropTypes.func.isRequired
};

export default EmployeesTable;
