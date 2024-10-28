import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_HOST } from '../config/apiConfig';
import { Notification } from '../model/Notification';

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
 */
export async function fetchCommentsByAnswerId(answerId) {
    try {
        const response = await axios.get(`${API_HOST}/comment/getCommentByAnswerId/${answerId}`);
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
 */
export async function sendComment(ownerId, answerId, content) {
    try {
        const response = await axios.post(`${API_HOST}/comment/sendComment`, {
            content,
            ownerId,
            answerId
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
 */
export async function deleteComment(commentId) {
    try {
        const response = await axios.delete(`${API_HOST}/comment/deleteComment/${commentId}`);
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
 */
export async function deleteCommentByAnswerId(answerId) {
    try {
        await axios.delete(`${API_HOST}/comment/deleteCommentByAnswerId/${answerId}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}


/**
 * Modifies a comment for a given user.
 * @param {string} commentId - The UUID of the comment to modify.
 * @param {Object} updatedData - The updated data for the comment.
 */
export async function modifyComment(commentId, updatedData) {
    try {
        const response = await axios.put(`${API_HOST}/comment/modifyComment/${commentId}`, updatedData);
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
 */
export async function fetchNotifications(userId) {
    try {
        const response = await axios.get(`${API_HOST}/notification/${userId}/`);
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
 */
export async function deleteNotification(userId, notificationId) {
    try {
        const response = await axios.delete(`${API_HOST}/notification/deleteNotification/${userId}/${notificationId}`);
        console.log('Deleted notification:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}


/**
 * Connects to the WebSocket for real-time notifications with a Bearer token for authentication.
 */
export function connectWebSocket(userId, setNotifications) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        console.error('No token found. WebSocket connection not established.');
        return;
    }

    // Append token as a query parameter for the SockJS connection
    const socket = new SockJS(`${API_HOST}/ws?token=${token}`);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
        { 'userId': userId }, 
        (frame) => {
            console.log('WebSocket connected:', frame);
            stompClient.subscribe(`/user/${userId}/notification`, (message) => {
                const data = JSON.parse(message.body);
                const notification = new Notification(data.message, data.sentAt, data.notificationType);

                setNotifications((prevNotifications) => [...prevNotifications, notification]);
            });
        }, 
        (error) => {
            console.error('WebSocket connection error:', error);
        }
    );

    return () => {
        stompClient.disconnect(() => {
            console.log('WebSocket disconnected');
        });
    };
}
