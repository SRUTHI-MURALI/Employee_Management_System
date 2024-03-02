import axios from "axios";
import { baseApiUrl } from "../config/config";

const reportsApiUrl = baseApiUrl + "reports/";

const reportsApi = async () => {
  try {
    const response = await axios.get(reportsApiUrl + "getReports");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export default reportsApi;
