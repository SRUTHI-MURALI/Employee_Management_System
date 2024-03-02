import axios from 'axios';
import { baseApiUrl } from '../config/config';

const generateSalariesApi = () => {
    const generateSalariesApiUrl = baseApiUrl + 'generatesalaries/';

    const getDataFromAccountantSpreadsheet = async (month) => {
        try {
            const response = await axios.get(`${generateSalariesApiUrl}getSalariesDataByAccountant?month=${month}`);
            return response.data;
        } catch (error) {
            console.error('Error getting data from accountant spreadsheet:', error);
            throw error;
        }
    };

    const getDataFromMainSpreadsheet = async (code) => {
        try {
            const response = await axios.get(`${generateSalariesApiUrl}getSalariesDataFromLastMonth`);
            return response.data;
        } catch (error) {
            console.error('Error getting data from main spreadsheet:', error);
            throw error;
        }
    };

    const importDataIntoSpreadsheet = async (year, month, lastRowIndex, salaries) => {
        try {
            const response = await axios.post(`${generateSalariesApiUrl}importDataIntoSpreadsheet`, {
                year: year,
                month: month,
                lastRowNumber: lastRowIndex,
                salaries: salaries
            });
            return response.data;
        } catch (error) {
            console.error('Error importing data into spreadsheet:', error);
            throw error;
        }
    };

    return {
        getDataFromAccountantSpreadsheet,
        getDataFromMainSpreadsheet,
        importDataIntoSpreadsheet
    };
};

export default generateSalariesApi;
