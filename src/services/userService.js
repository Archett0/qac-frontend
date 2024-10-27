import axios from '../config/axios';
import { API_HOST } from '../config/apiconfig';

const USER_API_URL = `${API_HOST}/user`;

/**
 * Fetches users from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export async function fetchUsers() {
    try {
        const response = await axios.get(USER_API_URL);
        return response.data; // Return the users data array
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Propagate error to handle it in the calling function
    }
}

/**
 * @param {Event} e
 * @param {string} email
 * @param {string} password
 */
export async function handleLogin(e, email, password) {
    e.preventDefault();
    try {
        const response = await axios.post(`${API_HOST}/user/auth/login`, {
            email,
            password,
        });
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);

        window.location.href = '/';
    } catch (error) {
        console.error('login fail:', error);
        alert('login fail');
    }
}
