import { combineReducers } from "redux";
import employees from "./employeeReducer";
import loggedUser from "./userReducer";
import generateSalariesReducer from "./generateSalariesReducer";
import reports from "./reportsReducer";
import reportsDetails from "./detailsReducer";
import loans from "./loansReducer";
import selectedDate from "./selectedDateReducer";

// Remove the import of redux-form

const rootReducer = combineReducers({
  employees,
  reports,
  reportsDetails,
  loans,
  selectedDate,
  loggedUser,
  // Remove formReducer from combineReducers
  employeesSalaries: generateSalariesReducer,
  // Remove googleSpreadSheetAuthReducer if it's no longer needed
});

export default rootReducer;
