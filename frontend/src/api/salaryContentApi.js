import axios from 'axios';
import { baseApiUrl } from '../config/config';

const getSalaryContent = async (url, year, month) => {
    try {
        const response = await axios.get(`${baseApiUrl}${url}/getByDate?year=${year}&month=${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching salary content:', error);
        throw error;
    }
};

const deleteSalaryContent = async (url, id) => {
    try {
        await axios.delete(`${baseApiUrl}${url}/${id}`);
        console.log('Successfully deleted salary content');
    } catch (error) {
        console.error('Error deleting salary content:', error);
        throw error;
    }
};

export { getSalaryContent, deleteSalaryContent };
