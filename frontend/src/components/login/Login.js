import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import Auth from "../../helper/auth";
import PropTypes from "prop-types";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

import * as config from "../../config/config";

const Login = ({ loggedUser, getLoggedUser, removeLoggedUser, history }) => {
  const onSuccess = async (credentialResponse) => {
    try {
        const idToken = credentialResponse.credential;
console.log(idToken,'token id')
        // const response = await googleLogin(idToken);

        // const studentData = response.data;

        // localStorage.setItem("studentData", JSON.stringify(studentData));
        // dispatch(login(studentData));

        // toast.success("successfully logged in");
        // navigate("/studentlandingpage");
    } catch (error) {
        console.error("Google authentication error:", error);
        // toast.error("Google authentication error");
    }
};

  // const onSuccess = googleUser => {
  //   const userHasPermission = config.emails.includes(
  //     googleUser.profileObj.email
  //   );
  //   if (userHasPermission) {
  //     Auth.setStorage(googleUser);
  //     getLoggedUser(googleUser.profileObj.email);
  //     history.push("/home");
  //   } else {
  //     Auth.signOut();
  //     removeLoggedUser();
  //     alert("You do not have permission to login");
  //   }
  // };

  const onFailure = error => {
    alert(error);
  };

  useEffect(() => {
    if (loggedUser != null) {
      history.push("/home");
    }
  }, [loggedUser, history]);

  return (
    <div className="container">
      <div className="container container__login">
        <div className="login__section">
          <img src={logo} alt="EMS Mars logo" className="login__section__logo" />
          <h4>Welcome to Mars EMS! </h4>
          <p className="no-data" style={{ marginBottom: "-.25rem" }}>
            Please sign in with your Google account!
          </p>
          <br />
          <br />
          <GoogleLogin
            buttonText="log in with Google"
            className="btn-primary btn-login"
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
          <div className="intro">
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms And Conditions</Link>
              </li>
              <li style={{ marginTop: ".6rem" }}>Made by Dzenis H.</li>
              <li>&copy; {new Date().getFullYear()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loggedUser: PropTypes.string,
  getLoggedUser: PropTypes.func.isRequired,
  removeLoggedUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default Login;
