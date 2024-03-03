import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import profileTabItems from "../../models/profileTabs";
import ContentApi from "../../api/contentApi";
import moment from "moment/moment";
import { XCircle } from "react-feather";
import getSalaryContent from "../../api/salaryContentApi";
import Swal from "sweetalert2";

const SalariesTabs = ({
  year,
  month,
  employeesSalaries,
  addEmployeesSalaries,
  updateEmployeesSalaryRaises,
  updateEmployeesBonuses,
  updateEmployeesPenalties,
  updateEmployeesLoans,
  updateEmployeesLoanNotes,
  updateEmployeesLoanExtraPayments
}) => {
  const [tabs, setTabs] = useState(profileTabItems);
  const [activeTab, setActiveTab] = useState({});
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setActiveTab(tabs[0]);
    getByIdActiveTabContent(year, month);
  }, []);

  const confirmTabAction = () => {
    const updatedTabs = tabs.map(item =>
      item.id === activeTab.id ? { ...item, confirmed: true } : item
    );
    setTabs(updatedTabs);
  };

  const setTabAsActive = selectedTab => {
    const updatedTabs = tabs.map(item =>
      item.id === selectedTab.id ? { ...item, active: true } : { ...item, active: false }
    );
    setTabs(updatedTabs);
    setActiveTab(selectedTab);
    setTimeout(() => {
      getByIdActiveTabContent(year, month);
    }, 100);
  };

  const openDeleteConfirmModal = (id) => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete an item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
      }
    });
  };

  const deleteItem = id => {
    ContentApi.delete(id, activeTab.url)
      .then(response => {
        setTimeout(() => {
          getByIdActiveTabContent(year, month);
        }, 100);
      })
      .catch(error => {
        console.log("error while adding raise salary", error);
        throw error;
      });
  };



 const getByIdActiveTabContent = (url, year, month) => {
    getSalaryContent(url, year, month)
      .then((response) => {
        setDisplayData(response.data);
      })
      .catch((error) => {
        console.log("error while getting data", error);
        throw error;
      });
  };

  const confirmSalaryAction = () => {
    confirmTabAction();
    switch (activeTab.id) {
      case 1:
        updateEmployeesSalaryRaises(displayData);
        break;
      case 2:
        updateEmployeesBonuses(displayData);
        break;
      case 3:
        updateEmployeesPenalties(displayData);
        break;
      case 4:
        updateEmployeesLoans(displayData);
        break;
      case 5:
        updateEmployeesLoanNotes(displayData);
        break;
      case 6:
        updateEmployeesLoanExtraPayments(displayData);
        break;
      default:
        break;
    }
  };

  const getEmployeeFullName = item => {
    let fullName = "";
    employeesSalaries.forEach(emp => {
      if (Number(emp.jmbg) === Number(item.employeeJMBG)) {
        fullName = emp.name;
      }
    });
    return fullName;
  };

  const displayTabContent = displayData.map(item => (
    <tr key={item.date.toString()}>
      <td className="col-md-3">{getEmployeeFullName(item)}</td>
      <td className="col-md-2">{moment(item.date).format("MM-DD-YYYY")}</td>
      <td className="col-md-2">{`${item.amount} ${item.unit}`}</td>
      <td className="col-md-4">{item.description}</td>
      <td className="col-md-1">
        <a className="table-actions" onClick={() => openDeleteConfirmModal(item.id)}>
          <XCircle size="18" />
        </a>
      </td>
    </tr>
  ));

  const tabsList = tabs.map(item => (
    <li
      className={`${item.active && "active"}`}
      key={item.id}
      onClick={() => setTabAsActive(item)}
    >
      <a data-toggle="tab">{item.name}</a>
    </li>
  ));

  return (
    <div className="portlet portlet-boxed">
      <div className="portlet-body portlet-body-salaries">
        <ul id="myTab1" className="nav nav-tabs">
          {tabsList}
        </ul>
        <div id="myTab1Content">
          <div className="tab-pane fade active in">
            <button
              className="btn btn-primary ml-20"
              disabled={activeTab.confirmed}
              onClick={confirmSalaryAction}
            >
              {activeTab.confirmed ? <span>Confirmed</span> : <span>Confirm</span>}
            </button>
            <table className="table table-striped mt-20">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{displayTabContent}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

SalariesTabs.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  employeesSalaries: PropTypes.array.isRequired,
  addEmployeesSalaries: PropTypes.func.isRequired,
  updateEmployeesSalaryRaises: PropTypes.func.isRequired,
  updateEmployeesBonuses: PropTypes.func.isRequired,
  updateEmployeesPenalties: PropTypes.func.isRequired,
  updateEmployeesLoans: PropTypes.func.isRequired,
  updateEmployeesLoanNotes: PropTypes.func.isRequired,
  updateEmployeesLoanExtraPayments: PropTypes.func.isRequired
};

export default SalariesTabs;
