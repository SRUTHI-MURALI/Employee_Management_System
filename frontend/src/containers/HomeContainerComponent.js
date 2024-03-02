import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Home from "../components/home/Home";
import * as employeeActions from "../actions/employeeActions";
import * as reportsActions from "../actions/reportsActions";
import * as loansActions from "../actions/loansActions";

const HomeContainerComponent = ({
  employees,
  reports,
  loans,
  getEmployeesAsync,
  getReportsAsync,
  getLoansAsync,
  history
}) => {
  useEffect(() => {
    // Fetch employees, reports, and loans when component mounts
    getEmployeesAsync();
    getReportsAsync();
    getLoansAsync();
  }, [getEmployeesAsync, getReportsAsync, getLoansAsync]);

  return (
    <div>
      <Home
        employees={employees}
        reports={reports}
        loans={loans}
        history={history}
      />
    </div>
  );
};

HomeContainerComponent.propTypes = {
  employees: PropTypes.array,
  reports: PropTypes.object,
  loans: PropTypes.object,
  getEmployeesAsync: PropTypes.func.isRequired,
  getReportsAsync: PropTypes.func.isRequired,
  getLoansAsync: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    employees: state.employees,
    reports: state.reports,
    loans: state.loans
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployeesAsync: useCallback(
      () => dispatch(employeeActions.getEmployeesAsync()),
      [dispatch]
    ),
    getReportsAsync: useCallback(
      () => dispatch(reportsActions.getReportsAsync()),
      [dispatch]
    ),
    getLoansAsync: useCallback(
      () => dispatch(loansActions.getLoansAsync()),
      [dispatch]
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainerComponent);
