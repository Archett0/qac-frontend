import axios from '../config/axios';
import { API_HOST } from '../config/apiconfig';

const QUESTION_API_URL = `${API_HOST}/QnA/question`;

export const fetchQuestions = async () => {
  const response = await axios.get(QUESTION_API_URL);
  return response.data;
};

export const fetchQuestionById = async (id) => {
  const response = await axios.get(`${QUESTION_API_URL}/${id}`);
  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await axios.post(`${QUESTION_API_URL}/add`, questionData);
  return response.data;
};

export const updateQuestion = async (question) => {
  try {
    const response = await axios.put(`${QUESTION_API_URL}/update`, question);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
  
};
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${QUESTION_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};
export const fetchAllQuestions = async () => {
  try {
    const response = await axios.get(`${API_HOST}/QnA/question`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
