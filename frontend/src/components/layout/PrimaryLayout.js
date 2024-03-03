import React, { useState, useEffect } from "react";
import logo from "../../img/logo.png";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import ReportsContainerComponent from "../../containers/ReportsContainerComponent";
import EmployeesContainerComponent from "../../containers/EmployeesContainerComponent";
import { Auth } from "../../helper/auth"; 
import LoginContainerComponent from "../../containers/LoginContainerComponent";
import EmployeeProfileContainerComponent from "../../containers/EmployeeProfileContainerComponent";
import HomeContainerComponent from "../../containers/HomeContainerComponent";
import GenerateSalariesContainerComponent from "../../containers/GenerateSalariesContainerComponent";
import ReportsDetailsContainerComponent from "../../containers/ReportsDetailsContainerComponent";
import EmployeeStatsContainerComponent from "../../containers/EmployeeStatsContainerComponent";
import LoansContainerComponent from "../../containers/LoansContainerComponent";
import About from "../../components/about/About";
import Privacy from "../../components/about/PrivacyPolicy";
import Terms from "../about/TermsAndConditions";

const PrimaryLayout = ({ loggedUser, removeLoggedUser, history }) => {
  const [currentRoute, setCurrentRoute] = useState("");

  const location = useLocation();

  const logout = () => {
    Auth.signOut();
    removeLoggedUser();
  };

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  return (
    <div className="wrapper">
      <header className="" role="banner">
        {loggedUser && (
          <div className="container">
            <div className="navbar navbar__container">
              <Link to="/home">
                <img src={logo} alt="EMS Mars logo" className="logo" />
              </Link>
              <ul className="navbar__menu">
                <li className={currentRoute === "/home" ? "active" : ""}>
                  <Link to="/home"> Home </Link>
                </li>

                <li className={currentRoute === "/employees" ? "active" : ""}>
                  <Link to="/employees"> Employees </Link>
                </li>

                <li className={currentRoute === "/reports" ? "active" : ""}>
                  <Link to="/reports"> Reports </Link>
                </li>

                <li className={currentRoute === "/loans" ? "active" : ""}>
                  <Link to="/loans"> Loans </Link>
                </li>

                <li className={currentRoute === "/salaries" ? "active" : ""}>
                  <Link to="/salaries"> Salaries </Link>
                </li>

                <li className={currentRoute === "/about" ? "active" : ""}>
                  <Link to="/about"> About </Link>
                </li>
              </ul>
              <Link
                to="/login"
                onClick={logout}
                className="navbar__links"
              >
                Sign out
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/home" element={<HomeContainerComponent />} />
          <Route path="/login" element={<LoginContainerComponent />} />
          <Route path="/loans" element={<LoansContainerComponent />} />
          <Route
            path="/salaries"
            element={<GenerateSalariesContainerComponent />}
          />
          <Route
            path="/employees"
            element={<EmployeesContainerComponent />}
          />
          <Route
            path="/employees/:itemId"
            element={<EmployeeProfileContainerComponent />}
          />
          <Route
            path="/reports"
            element={<ReportsContainerComponent />}
          />
          <Route
            path="/reports/details"
            element={<ReportsDetailsContainerComponent />}
          />
          <Route
            path="/reports/details/:itemId"
            element={<EmployeeStatsContainerComponent />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
};

export default PrimaryLayout;
