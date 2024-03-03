import React, { useState, useEffect } from 'react';
import RaiseSalaryForm from "../../redux-forms/SalaryRaiseForm";
import PenaltyForm from "../../redux-forms/PenaltyForm";
import BonusForm from "../../redux-forms/BonusForm";
import LoanForm from "../../redux-forms/LoanForm";
import LoanNoteForm from "../../redux-forms/LoanNoteForm";
import LoanPaymentForm from "../../redux-forms/LoanPaymentForm";
import noDataIl from '../../../img/no-data-illustration.png';
import ContentApi from "../../../api/contentApi";
import moment from "moment/moment";
import PropTypes from "prop-types";
import profileTabItems from '../../../models/profileTabs';
import Swal from 'sweetalert2';
// import Rodal from 'rodal';

const TabContentComponent = ({ activeTab, employeeJMBG }) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        getByIdActiveTabContent(activeTab);
    }, [activeTab]);

    const show = () => {
        setVisibleModal(true);
    }

    const hide = () => {
        setVisibleModal(false);
    }

    const getForm = () => {
        let form;

        switch (activeTab.id) {
            case profileTabItems[0].id:
                form = <RaiseSalaryForm addSalaryRaise={addTabContent}/>
                break;
            case profileTabItems[1].id:
                form = <BonusForm addBonus={addTabContent}/>
                break;
            case profileTabItems[2].id:
                form = <PenaltyForm addPenalty={addTabContent}/>
                break;
            case profileTabItems[3].id:
                form = <LoanForm addLoan={addTabContent}/>
                break;
            case profileTabItems[4].id:
                form = <LoanNoteForm addLoanNote={addTabContent}/>
                break;
            case profileTabItems[5].id:
                form = <LoanPaymentForm addLoanExtraPayment={addTabContent}/>
                break;
            default:
                form = <RaiseSalaryForm addSalaryRaise={addTabContent}/>
        }
        return form;
    }

    const addTabContent = (values) => {
        let data = Object.assign({}, values);
        data.employeeJMBG = employeeJMBG;
        ContentApi.post(data, activeTab.url)
            .then(response => {
                getByIdActiveTabContent(activeTab);
                hide();
            })
            .catch(error => {
                console.log('error while adding raise salary', error);
                throw error;
            });
    }

    const deleteTabContent = (id) => {
        ContentApi.delete(id, activeTab.url)
            .then(response => {
                getByIdActiveTabContent(activeTab);
            })
            .catch(error => {
                console.log('error while adding raise salary', error);
                throw error;
            });
    }

    const openDeleteConfirmModal = (id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete an item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTabContent(id);
            }
        });
    }

    const getByIdActiveTabContent = (value) => {
        ContentApi.getById(employeeJMBG, value.url)
            .then(response => {
                setDisplayData(response.data);
            })
            .catch(error => {
                console.log('error while adding raise salary', error);
                throw error;
            });
    }

    const displayTabContent = displayData.map(item => (
        <tr key={item.date.toString()}>
            <td className="col-md-3">{moment(item.date).format('MM-DD-YYYY')}</td>
            <td className="col-md-3">{item.amount} {item.unit}</td>
            <td className="col-md-5">{item.description}</td>
            <td className="col-md-1">
                <a onClick={() => openDeleteConfirmModal(item.id)}><span className="fa fa-times icon-pointer"></span></a>
            </td>
        </tr>
    ));

    return (
        <div>
            <div className="col-md-8">
                <div className="form-content">
                    <div className="portlet portlet-boxed">
                        <div className="portlet-header tab-content-portlet-header">
                            <h4 className="portlet-title">{activeTab.name}</h4>
                            <button className="btn btn-primary submit-button" onClick={show}> Add new</button>
                        </div>
                        {displayData.length > 0 &&
                            <div>
                                <div className="portlet-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Description</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayTabContent}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                        {displayData.length === 0 &&
                            <div className="portlet-body no-data__wrapper">
                                <img src={noDataIl} alt="Missing data illustration" className="no-data__image"/>
                                <p className="no-data">Oops there is no data for this employee detail item! <br/> Please add some!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <Rodal visible={visibleModal} onClose={hide} closeOnEsc={true} customStyles={{ height: 'auto', bottom: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
                {getForm()}
            </Rodal>
        </div>
    );
}

TabContentComponent.propTypes = {
    activeTab: PropTypes.object.isRequired,
    employeeJMBG: PropTypes.string.isRequired,
};

export default TabContentComponent;
