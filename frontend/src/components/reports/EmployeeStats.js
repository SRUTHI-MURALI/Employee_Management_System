// import React, { useState, useEffect, useContext } from "react";
// import EmployeeApi from "../../api/employeeApi";
// import { ArrowLeft } from "react-feather";
// import * as _ from "lodash";
// import moment from "moment";
// // import BootstrapTable from "react-bootstrap-table-next";
// // import paginationFactory from "react-bootstrap-table2-paginator";
// import { useHistory } from "react-router-dom";

// const EmployeeStats = (props) => {
//   const history = useHistory();
//   const [currentEmployee, setCurrentEmployee] = useState({ salaryInfo: [] });

//   const getEmployeeSalaryData = async () => {
//     const { item } = props.history.location.state;
//     const employee = await EmployeeApi.getEmployee(item);
//     setCurrentEmployee((prevState) => ({
//       ...prevState,
//       salaryInfo: Object.assign([], employee.data),
//     }));
//   };

//   useEffect(() => {
//     getEmployeeSalaryData();
//   }, []);

//   const { item } = props.history.location.state;
//   const { salaryInfo } = currentEmployee;
//   const { employees } = props;
//   const onlyName = item.substr(0, item.indexOf(" "));
//   let workedDates = [];

//   salaryInfo.forEach((sal) => {
//     if (sal.totalNetSalary !== "") {
//       workedDates.push(sal);
//     }
//   });

//   let currentEmp = [];
//   employees.map((y) => {
//     if (`${y.name} ${y.surname}` === item.toString()) {
//       return currentEmp.push(y);
//     }
//     return null;
//   });

//   const empStartDate = currentEmp.map((x) =>
//     moment(x.startdate).format("M/YYYY")
//   );
//   const empEndDate = currentEmp.map((x) => {
//     if (x.enddate !== undefined) {
//       return moment(x.enddate).format("M/YYYY");
//     } else {
//       return (
//         <span key={empStartDate + empEndDate} style={{ color: "#48c6ef" }}>
//           Still active
//         </span>
//       );
//     }
//   });

//   let finalFormat = _.sortBy(workedDates, (o) => new moment(o.date)).reverse();

//   const columns = [
//     { dataField: "year", text: "YEAR" },
//     { dataField: "month", text: "MONTH" },
//     { dataField: "totalGrossSalary", text: "GROSS" },
//     { dataField: "totalNetSalary", text: "NET" },
//     { dataField: "bankHotMeal", text: "MEAL" },
//     { dataField: "bankContributes", text: "TAX" },
//     { dataField: "handTotal", text: "SALARY" },
//   ];

//   let allValues = Number(finalFormat.length);

//   const options = {
//     paginationSize: 12,
//     pageStartIndex: 0,
//     firstPageText: "First",
//     prePageText: "Back",
//     nextPageText: "Next",
//     lastPageText: "Last",
//     nextPageTitle: "First page",
//     prePageTitle: "Pre page",
//     firstPageTitle: "Next page",
//     lastPageTitle: "Last page",
//     sizePerPageList: [
//       { text: "1 year", value: 12 },
//       { text: "2 years", value: 24 },
//       { text: "All years", value: allValues },
//     ],
//   };

//   return (
//     <div className="container">
//       <div className="row navigation-row-2">
//         <p className="btn btn-hollow" onClick={history.goBack}>
//           <ArrowLeft size="18" className="button-left-icon" /> Go back to Details
//         </p>
//       </div>

//       <div>
//         <header style={{ textAlign: "center" }}>
//           <h4>
//             {" "}
//             <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
//               {" "}
//               {onlyName}'s
//             </span>{" "}
//             detailed payment info{" "}
//           </h4>
//         </header>

//         <div className="col-md-6" style={{ textAlign: "center" }}>
//           <p>
//             START DATE <i className={`fa fa-long-arrow-right`}></i>
//             <span
//               style={{
//                 fontFamily: "Arial",
//                 color: "#0ea55c",
//                 fontWeight: "bold",
//                 letterSpacing: "2px",
//                 fontSize: "1,5rem",
//               }}
//             >
//               {" "}
//               {empStartDate}
//             </span>
//           </p>
//         </div>
//         <div className="col-md-6" style={{ textAlign: "center" }}>
//           <p>
//             END DATE <i className={`fa fa-long-arrow-right`}></i>
//             <span
//               style={{
//                 fontFamily: "Arial",
//                 color: "#da002e",
//                 fontWeight: "bold",
//                 letterSpacing: "2px",
//                 fontSize: "1,5rem",
//               }}
//             >
//               {" "}
//               {empEndDate}
//             </span>
//           </p>
//         </div>
//         <hr />
//       </div>

//       <BootstrapTable
//         keyField="rowNumber"
//         striped
//         data={finalFormat}
//         columns={columns}
//         pagination={paginationFactory(options)}
//       />
//     </div>
//   );
// };

// export default EmployeeStats;


import React, { useState, useEffect } from "react";
import EmployeeApi from "../../api/employeeApi";
import { ArrowLeft } from "react-feather";
import * as _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const EmployeeStats = (props) => {
  const navigate = useNavigate();
  const [currentEmployee, setCurrentEmployee] = useState({ salaryInfo: [] });
  const [pageNumber, setPageNumber] = useState(0);

  const employeesPerPage = 10;
  const pagesVisited = pageNumber * employeesPerPage;

  const getEmployeeSalaryData = async () => {
    const { item } = props.history.location.state;
    const employee = await EmployeeApi.getEmployee(item);
    setCurrentEmployee((prevState) => ({
      ...prevState,
      salaryInfo: Object.assign([], employee.data),
    }));
  };

  useEffect(() => {
    getEmployeeSalaryData();
  }, []);

  const { item } = props.history.location.state;
  const { salaryInfo } = currentEmployee;
  const { employees } = props;
  const onlyName = item.substr(0, item.indexOf(" "));
  let workedDates = [];

  salaryInfo.forEach((sal) => {
    if (sal.totalNetSalary !== "") {
      workedDates.push(sal);
    }
  });

  let currentEmp = [];
  employees.map((y) => {
    if (`${y.name} ${y.surname}` === item.toString()) {
      return currentEmp.push(y);
    }
    return null;
  });

  const empStartDate = currentEmp.map((x) =>
    moment(x.startdate).format("M/YYYY")
  );
  const empEndDate = currentEmp.map((x) => {
    if (x.enddate !== undefined) {
      return moment(x.enddate).format("M/YYYY");
    } else {
      return (
        <span key={empStartDate + empEndDate} style={{ color: "#48c6ef" }}>
          Still active
        </span>
      );
    }
  });

  let finalFormat = _.sortBy(workedDates, (o) => new moment(o.date)).reverse();

  const displayEmployees = finalFormat
    .slice(pagesVisited, pagesVisited + employeesPerPage)
    .map((employee, index) => {
      return (
        <tr key={index}>
          <td>{employee.year}</td>
          <td>{employee.month}</td>
          <td>{employee.totalGrossSalary}</td>
          <td>{employee.totalNetSalary}</td>
          <td>{employee.bankHotMeal}</td>
          <td>{employee.bankContributes}</td>
          <td>{employee.handTotal}</td>
        </tr>
      );
    });

  const pageCount = Math.ceil(finalFormat.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <div className="row navigation-row-2">
        <p className="btn btn-hollow" onClick={() => navigate(-1)}>
          <ArrowLeft size="18" className="button-left-icon" /> Go back to Details
        </p>
      </div>

      <div>
        <header style={{ textAlign: "center" }}>
          <h4>
            {" "}
            <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
              {" "}
              {onlyName}'s
            </span>{" "}
            detailed payment info{" "}
          </h4>
        </header>

        <div className="col-md-6" style={{ textAlign: "center" }}>
          <p>
            START DATE <i className={`fa fa-long-arrow-right`}></i>
            <span
              style={{
                fontFamily: "Arial",
                color: "#0ea55c",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1,5rem",
              }}
            >
              {" "}
              {empStartDate}
            </span>
          </p>
        </div>
        <div className="col-md-6" style={{ textAlign: "center" }}>
          <p>
            END DATE <i className={`fa fa-long-arrow-right`}></i>
            <span
              style={{
                fontFamily: "Arial",
                color: "#da002e",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1,5rem",
              }}
            >
              {" "}
              {empEndDate}
            </span>
          </p>
        </div>
        <hr />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>YEAR</th>
            <th>MONTH</th>
            <th>GROSS</th>
            <th>NET</th>
            <th>MEAL</th>
            <th>TAX</th>
            <th>SALARY</th>
          </tr>
        </thead>
        <tbody>
          {displayEmployees}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default EmployeeStats;
