import React, { useState, useEffect } from "react";
import { ArrowLeft, Activity } from "react-feather";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import { PieChart, Pie, Cell } from "recharts";

import { useSelector, useDispatch } from "react-redux";
import { saveSelectedDate } from "../../actions/selectedDateActions";
import { getSpecificSalaryData } from "../../actions/reportsDetailsActions";

const ReportsDetails = (props) => {
  const dispatch = useDispatch();
  const { relevantDate, myData } = useSelector((state) => state);
  const [currentSession, setCurrentSession] = useState({
    salaryInfo: [],
    fullNames: [],
  });

  useEffect(() => {
    if (!_.isEmpty(myData)) {
      setCurrentSession({
        fullNames: myData.names,
        salaryInfo: Object.values(myData.salaryInfo),
      });
    }
  }, [myData]);

  useEffect(() => {
    if (!_.isEmpty(props.details)) {
      setCurrentSession({
        fullNames: props.details.names,
        salaryInfo: Object.values(props.details.salaryInfo),
      });
    }
  }, [props.details]);

  const { employees } = props;
  const { relYear, relMonth } = props.history.location.state.dev;
  const { salaryInfo, fullNames } = currentSession;
  const displayDate = relMonth + " of " + relYear;
  const empData = [];

  for (let x = 0; x < fullNames.length; x++) {
    employees.map((y) => {
      if (`${y.name} ${y.surname}` === fullNames[x].toString()) {
        empData.push(y);
      }
      return null;
    });
  }

  const maleArr = [];
  const femaleArr = [];
  empData.forEach((gen) => {
    gen.gender === "M" ? maleArr.push(gen.gender) : femaleArr.push(gen.gender);
  });

  const maleNum = maleArr.length;
  const femaleNum = femaleArr.length;
  const empNum = empData.length;
  const maleData = ((maleNum / empNum) * 100).toFixed(2);
  const femaleData = ((femaleNum / empNum) * 100).toFixed(2);

  const activeEmployees = empData.filter((item) => !item.enddate);
  const notActiveEmployees = empData.filter((item) => item.enddate);

  const activeNum = activeEmployees.length;
  const notActiveNum = notActiveEmployees.length;
  const activeStats = ((activeNum / empNum) * 100).toFixed(2);
  const notActiveStats = ((notActiveNum / empNum) * 100).toFixed(2);

  const positions = ["DEV", "QA", "ADMIN", "INTERN", "DESIGN", "EXECUTIVE"];
  const positionStats = positions.map((pos) => {
    const num = empData.filter((item) => item.position === pos).length;
    return {
      position: pos,
      percentage: ((num / empNum) * 100).toFixed(2),
    };
  });

  const colors = ["#3566ba", "#5db84e", "#c43323", "#b5872b", "#9620db", "#eb7b3d"];

  const renderPieChart = (data, title) => (
    <div className="portlet portlet-boxed">
      <div className="portlet-header">
        <h4 className="portlet-title">{title}</h4>
      </div>
      <div className="portlet-body" style={{ textAlign: "center", fontWeight: "400", letterSpacing: "2px" }}>
        {data.map((item, index) => (
          <p key={index}>
            <span style={{ fontFamily: "Arial", color: colors[index], fontWeight: "bold", letterSpacing: "2px" }}>
              {item.position}
            </span>{" "}
            <i className={`fa fa-long-arrow-right`} /> {item.percentage} %
          </p>
        ))}
        <PieChart
          className="col-md-4"
          width={220}
          height={220}
        >
          <Pie data={data} dataKey="percentage" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row navigation-row-2">
        <Link to="/reports" className="btn btn-hollow">
          <ArrowLeft size="18" className="button-left-icon" /> Go back to reports
        </Link>
      </div>

      <div>
        <header style={{ textAlign: "center" }}>
          <h4>
            List of all relevant employees for
            <span style={{ color: "#48C6EF", fontStyle: "italic" }}> {displayDate} </span>
          </h4>
          <p style={{ color: "#48C6EF", margin: "0px" }}>
            Further details available by clicking on an icon{" "}
          </p>
        </header>
        <hr />
      </div>

      <div className="row">
        <div className="col-lg-9">
          <div className="portlet-body2">
            <table className="table table-striped auto-index">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NAME</th>
                  <th>NET</th>
                  <th>GROSS</th>
                  <th>MEALS</th>
                  <th>TAXES</th>
                  <th>SALARY</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {fullNames.map((item, idx) => (
                  <tr key={item}>
                    <td>{idx + 1}</td>
                    <td>{item}</td>
                    <td>{salaryInfo[idx]?.totalNetSalary}</td>
                    <td>{salaryInfo[idx]?.totalGrossSalary}</td>
                    <td>{salaryInfo[idx]?.bankHotMeal}</td>
                    <td>{salaryInfo[idx]?.bankContributes}</td>
                    <td>{salaryInfo[idx]?.handSalary}</td>
                    <td className="table-actions">
                      <Link to={{ pathname: `/reports/details/${item}`, state: { item } }}>
                        <Activity size="20" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h6>
                Total number of employees
                <i className={`fa fa-long-arrow-right`} />
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#3291b6",
                    fontWeight: "bold",
                    letterSpacing: "3px",
                    fontSize: "2rem",
                  }}
                >
                  {" "}
                  {fullNames.length}{" "}
                </span>
              </h6>
            </div>
          </div>

          {renderPieChart(
            [
              { position: "Male", percentage: maleData },
              { position: "Female", percentage: femaleData },
            ],
            "Male vs. Female Ratio"
          )}

          {renderPieChart(
            [
              { position: "Active", percentage: activeStats },
              { position: "Inactive", percentage: notActiveStats },
            ],
            "Active vs. Inactive Stats"
          )}

          {renderPieChart(positionStats, "Position Statistics")}
        </div>
      </div>
    </div>
  );
};

export default ReportsDetails;
