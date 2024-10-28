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

export async function fetchUserProfile(userId) {
    try {
        const response = await axios.get(`${USER_API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
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

/**
 * @param {Event} e
 * @param {string} email
 * @param {string} password
 * @param {string} username
 */
export async function handleRegister(e, email, password, username) {
    e.preventDefault();
    try {
        const response = await axios.post(`${API_HOST}/user/auth/register`, {
            email,
            password,
            username,
        });

        if (response.status === 201) {
            alert('User registered successfully');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Register failed:', error);
        if (error.response && error.response.status === 400) {
            alert('User already exists');
        } else {
            alert('Registration failed. Please try again.');
        }
    }
}
