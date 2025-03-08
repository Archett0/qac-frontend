import axios from 'axios';
import {API_HOST} from '../config/apiconfig';

const search_API_URL = `${API_HOST}/search`;

export const searchQuestions = async (keyword, token) => {
    const response = await axios.get(`${search_API_URL}/questions`, {
        params: {keyword},
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const searchUsers = async (keyword, token) => {
    const response = await axios.get(`${search_API_URL}/users`, {
        params: {keyword},
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};
