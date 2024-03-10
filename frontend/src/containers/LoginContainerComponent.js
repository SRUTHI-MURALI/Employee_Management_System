import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import LoginComponent from "../components/login/Login";
import { useNavigate } from 'react-router-dom';

const LoginContainerComponent = () => {
    // const loggedUser = useSelector(state => state.loggedUser);
    // const dispatch = useDispatch();
    // const navigate = useNavigate(); // Get the navigate function from React Router

    // const getLoggedUser = () => {
    //     // Dispatch action to get logged user
    //     dispatch(userActions.getLoggedUser());
    // };

    // const removeLoggedUser = () => {
    //     // Dispatch action to remove logged user
    //     dispatch(userActions.removeLoggedUser());
    // };

    return (
        <div>
            <LoginComponent
                // loggedUser={loggedUser}
                // getLoggedUser={getLoggedUser}
                // removeLoggedUser={removeLoggedUser}
                // navigate={navigate} // Pass the navigate function to the LoginComponent
            />
        </div>
    );
};

// LoginContainerComponent.propTypes = {
//     loggedUser: PropTypes.string
// };

export default LoginContainerComponent;
