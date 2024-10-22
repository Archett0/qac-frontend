// src/services/AnswerService.js

import axios from 'axios';
import { API_HOST } from '../config/apiconfig'; 

const ANSWER_API_URL = `${API_HOST}/QnA/answers`;

export const fetchAnswersByQuestionId = async (questionId) => {
  try {
    const response = await axios.get(`${ANSWER_API_URL}/by-question/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw error;
  }
};

export const createAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${ANSWER_API_URL}/create`, answerData);
    return response.data;
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
  
};
/**
 * Deletes an answer by ID
 * @param {UUID} answerId
 * @returns {Promise<void>}
 */
export const deleteAnswerById = async (answerId) => {
  try {
    await axios.delete(`${ANSWER_API_URL}/${answerId}`);
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error;
  }
};