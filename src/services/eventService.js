import axios from 'axios';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {API_HOST} from '../config/apiConfig';
import {Notification} from '../model/Notification';

const event_API_URL = `${API_HOST}/event`;

/**
 * Fetches events from the API.
 */
export async function fetchEvents() {
    try {
        const response = await axios.get(event_API_URL);
        console.log('Fetched events:', response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

/**
 * Fetches comments by answerId.
 * @param {string} answerId - The UUID of the answerId to fetch comments for.
 * @param token
 */
export async function fetchCommentsByAnswerId(answerId, token) {
    try {
        const response = await axios.get(`${API_HOST}/comment/getCommentByAnswerId/${answerId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('Fetched comments:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

/**
 * Sends a comment for a given user.
 * @param {string} ownerId - The UUID of the user (owner of the comment).
 * @param {string} answerId - The ID of the answer the comment is associated with.
 * @param {string} content - The content of the comment.
 * @param token
 */
export async function sendComment(ownerId, answerId, content, token) {
    try {
        const response = await axios.post(`${API_HOST}/comment/sendComment`, {
            content,
            ownerId,
            answerId
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('Sent comment:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending comment:', error);
        throw error;
    }
}


/**
 * Deletes a comment for a given user.
 * @param {string} commentId - The UUID of the comment to delete.
 * @param token
 */
export async function deleteComment(commentId, token) {
    try {
        const response = await axios.delete(`${API_HOST}/comment/deleteComment/${commentId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('Deleted comment:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

/**
 * Deletes a comment for a given user.
 * @param {string} answerId - The UUID of the answer to delete.
 * @param token
 */
export async function deleteCommentByAnswerId(answerId, token) {
    try {
        await axios.delete(`${API_HOST}/comment/deleteCommentByAnswerId/${answerId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}


/**
 * Modifies a comment for a given user.
 * @param {string} commentId - The UUID of the comment to modify.
 * @param {Object} updatedData - The updated data for the comment.
 * @param token
 */
export async function modifyComment(commentId, updatedData, token) {
    try {
        const response = await axios.put(`${API_HOST}/comment/modifyComment/${commentId}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('Modified comment:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error modifying comment:', error);
        throw error;
    }
}

/**
 * Fetches all notifications for a given user.
 * @param {string} userId - The UUID of the user.
 * @param token
 */
export async function fetchNotifications(userId, token) {
    try {
        const response = await axios.get(`${API_HOST}/notification/${userId}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        //console.log('Fetched notifications:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

/**
 * Deletes a notification for a given user.
 * @param {string} userId - The UUID of the user.
 * @param {number} notificationId - The ID of the notification to delete.
 * @param token
 */
export async function deleteNotification(userId, notificationId, token) {
    try {
        const response = await axios.delete(`${API_HOST}/notification/deleteNotification/${userId}/${notificationId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('Deleted notification:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}
