import React from 'react';
import PropTypes from 'prop-types';
import AddEmployeeForm from "../redux-forms/AddEmployeeForm";
import _ from "lodash";
import moment from 'moment';

const AddEmployeeRightPanel = ({ employees, addEmployee }) => {
    const getLastNumberRowOfEmployeeSheet = () => {
        const lastIndex = _.maxBy(employees, item => item.rowNumber);
        return lastIndex ? lastIndex.rowNumber + 1 : 1;
    }
    
    const addEmployeeHandler = (values) => {
        let formData = { ...values };
        formData.isPayoneer = formData.isPayoneer || false;
        if (formData.birthdate && formData.startdate) {
            formData.birthdate = moment(formData.birthdate).format('MM-DD-YYYY');
            formData.startdate = moment(formData.startdate).format('MM-DD-YYYY');
        }
        addEmployee(formData, getLastNumberRowOfEmployeeSheet());
    }

    return (
        <div className="col-md-4">
            <div className="portlet portlet-boxed">
                <div className="portlet-header">
                    <h4 className="portlet-title">
                        Add new employee
                    </h4>
                </div>
                <div className="portlet-body">
                    <div id="settings-content" className="stacked-content">
                        <div className="tab-pane fade in active" id="profile-tab">
                            <AddEmployeeForm addEmployee={addEmployeeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddEmployeeRightPanel.propTypes = {
    employees: PropTypes.array.isRequired,
    addEmployee: PropTypes.func
};

export default AddEmployeeRightPanel;
