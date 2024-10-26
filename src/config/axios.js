import axios from 'axios';
import { API_HOST } from './apiconfig';

axios.defaults.baseURL = API_HOST;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    console.log(localStorage.getItem('jwtToken'));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // alert('Session expired. Please log in again.');
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
