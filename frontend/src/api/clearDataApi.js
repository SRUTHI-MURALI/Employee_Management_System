import axios from 'axios';
import { baseApiUrl } from '../config/config';

const useClearDataApi = () => {
    const remove = async (month, year) => {
        try {
            const response = await axios.delete(`${baseApiUrl}cleardata/remove?month=${month}&year=${year}`);
            return response.data;
        } catch (error) {
            console.error('Error while removing data:', error);
            throw error;
        }
    };

    return { remove };
};

export default useClearDataApi;
