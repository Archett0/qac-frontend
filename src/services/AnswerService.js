import axios from 'axios';
import {API_HOST} from '../config/apiConfig';

const ANSWER_API_URL = `${API_HOST}/QnA/answers`;

export const fetchAnswersByQuestionId = async (questionId, token) => {
    try {
        const response = await axios.get(`${ANSWER_API_URL}/by-question/${questionId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching answers:', error);
        throw error;
    }
};

export const createAnswer = async (answerData, token) => {
    try {
        const response = await axios.post(`${ANSWER_API_URL}/create`, answerData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating answer:', error);
        throw error;
    }

};
/**
 * Deletes an answer by ID
 * @param {UUID} answerId
 * @param token
 * @returns {Promise<void>}
 */
export const deleteAnswerById = async (answerId, token) => {
    try {
        await axios.delete(`${ANSWER_API_URL}/${answerId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting answer:', error);
        throw error;
    }
};