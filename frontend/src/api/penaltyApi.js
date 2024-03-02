import axios from 'axios';
import { baseApiUrl } from '../config/config';

const penaltyApi = () => {
    const penaltyApiUrl = baseApiUrl + 'penalty';

    const addBulk = async (penalties) => {
        try {
            const response = await axios.post(`${penaltyApiUrl}/addBulk`, penalties);
            return response.data;
        } catch (error) {
            console.error('Error adding bulk penalties:', error);
            throw error;
        }
    };

    return {
        addBulk
    };
};

export default penaltyApi;
