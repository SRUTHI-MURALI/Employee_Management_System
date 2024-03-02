import axios from "axios";
import { baseApiUrl } from "../config/config";

const detailsApiUrl = baseApiUrl + "reportsdetails/";

const getDetails = async (date) => {
  try {
    const response = await axios.post(detailsApiUrl + "getDetails", date);
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

export default getDetails;
