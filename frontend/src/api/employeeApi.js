import axios from "axios";
import { baseApiUrl } from "../config/config";

const employeeApiUrl = `${baseApiUrl}employee/`;

class EmployeeApi {
  static async getEmployees() {
    try {
      const response = await axios.get(`${employeeApiUrl}getEmployees`);
      console.log(response.data,'get employee')
      return response.data;
    } catch (error) {
      console.error("Error while fetching employees:", error);
      throw error;
    }
  }

  static async getEmployee(value) {
    try {
      const response = await axios.get(
        `${employeeApiUrl}getEmployee?employeeSheetName=${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching employee:", error);
      throw error;
    }
  }

  static async addEmployee(employee, lastRowNumber) {
    try {
      const response = await axios.post(`${employeeApiUrl}addEmployee`, {
        employee,
        lastRowNumber
      });
      return response.data;
    } catch (error) {
      console.error("Error while adding employee:", error);
      throw error;
    }
  }

  static async changeEmployeeStatus(rowNumber, date) {
    try {
      const response = await axios.put(`${employeeApiUrl}disableEmployee`, {
        rowNumber,
        date
      });
      return response.data;
    } catch (error) {
      console.error("Error while changing employee status:", error);
      throw error;
    }
  }
}

export default EmployeeApi;
