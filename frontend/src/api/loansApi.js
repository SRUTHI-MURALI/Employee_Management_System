import axios from 'axios';
import { baseApiUrl } from '../config/config';

const loansApiUrl = baseApiUrl + 'loan/';

const loansApi = () => {
    const getLoansData = async () => {
        try {
            const response = await axios.get(loansApiUrl + 'getLoansData');
            return response.data;
        } catch (error) {
            console.error('Error while fetching loans data:', error);
            throw error;
        }
    };

    const addBulk = async (loanData) => {
        try {
            const response = await axios.post(loansApiUrl + 'addBulk', loanData);
            return response.data;
        } catch (error) {
            console.error('Error while adding bulk loans:', error);
            throw error;
        }
    };

    return { getLoansData, addBulk };
};

export default loansApi;
