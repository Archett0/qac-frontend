import axios from 'axios';
import { API_HOST } from '../config/apiconfig'; 

const search_API_URL = `${API_HOST}/search`;

export const searchQuestions = async (keyword) => {
  const response = await axios.get(`${search_API_URL}/questions`, {
    params: { keyword }
  });
  return response.data;
};

export const searchUsers = async (keyword) => {
  const response = await axios.get(`${search_API_URL}/users`, {
    params: { keyword }
  });
  return response.data;
};
