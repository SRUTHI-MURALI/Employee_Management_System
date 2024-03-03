import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import PrimaryLayout from "../components/layout/PrimaryLayout";
import { useNavigate } from 'react-router-dom';

const PrimaryLayoutContainerComponent = () => {
    const loggedUser = useSelector(state => state.loggedUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Dispatch action to remove logged user
        dispatch(userActions.removeLoggedUser());
        // Navigate to login page
        navigate('/login');
    };

    return (
        <div>
            <PrimaryLayout
                loggedUser={loggedUser}
                handleLogout={handleLogout}
            />
        </div>
    );
};

export default PrimaryLayoutContainerComponent;
