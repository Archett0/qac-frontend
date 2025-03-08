import axios from '../config/axios';
import {API_HOST} from '../config/apiconfig';

const QUESTION_API_URL = `${API_HOST}/QnA/question`;

export const fetchQuestions = async (token) => {
    const response = await axios.get(QUESTION_API_URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchQuestionById = async (id, token) => {
    const response = await axios.get(`${QUESTION_API_URL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createQuestion = async (questionData, token) => {
    const response = await axios.post(`${QUESTION_API_URL}/add`, questionData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const updateQuestion = async (question, token) => {
    try {
        const response = await axios.put(`${QUESTION_API_URL}/update`, question, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }

};
export const deleteQuestion = async (id, token) => {
    try {
        const response = await axios.delete(`${QUESTION_API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};
export const fetchAllQuestions = async (token) => {
    try {
        console.log("Fetching all questions...");
        const response = await axios.get(`${API_HOST}/QnA/question`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};
export const fetchQuestionsByOwnerId = async (ownerId, token) => {
    try {
        const response = await axios.get(`${QUESTION_API_URL}/owner/${ownerId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions by owner ID:', error);
        throw error;
    }
};
