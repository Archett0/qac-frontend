import axios from '../config/axios';
import {API_HOST} from '../config/apiconfig';

const USER_API_URL = `${API_HOST}/user`;

/**
 * Fetches users from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export async function fetchUsers(token) {
    try {
        const response = await axios.get(USER_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the users data array
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Propagate error to handle it in the calling function
    }
}

export async function fetchUserProfile(userId, token) {
    try {
        const response = await axios.get(`${USER_API_URL}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export async function deleteUser(id, token) {
    try {
        const response = await axios.delete(`${USER_API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export async function updateUser(id, user, token) {
    try {
        const response = await axios.put(`${USER_API_URL}/${id}`, user, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
