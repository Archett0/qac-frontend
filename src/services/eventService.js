import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_HOST } from '../config/apiconfig';
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
 * Connects to the WebSocket for real-time notifications.
 */
export function connectWebSocket(userId, setNotifications) {
    const socket = new SockJS(`${API_HOST}/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({ 'userId': userId }, (frame) => {
        console.log('WebSocket connected:', frame);
        stompClient.subscribe(`/user/${userId}/notification`, (message) => {
            const data = JSON.parse(message.body);
            const notification = new Notification(data.message, data.sentAt, data.notificationType);

            setNotifications((prevNotifications) => [...prevNotifications, notification]);

            //console.log('Received message:', message.body);
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);
    });

    return () => {
        stompClient.disconnect(() => {
            console.log('WebSocket disconnected');
        });
    };
}
