import axios from "axios";
import {API_HOST} from '../config/apiconfig';

const VOTE_API_URL = `${API_HOST}/vote`;

/**
 * Send an upvote request to the API.
 * @param {Object} voteRequest The vote request payload containing necessary vote data.
 * @param token
 * @returns {Promise} A promise that resolves to the server's response
 */
export async function clickUpvote(voteRequest, token) {
    try {
        const response = await axios.post(`${VOTE_API_URL}/upvote`, voteRequest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during upvote:', error);
        throw error;
    }
}

/**
 * Send a downvote request to the API.
 * @param {Object} voteRequest The vote request payload containing necessary vote data.
 * @param token
 * @returns {Promise} A promise that resolves to the server's response
 */
export async function clickDownvote(voteRequest, token) {
    try {
        const response = await axios.post(`${VOTE_API_URL}/downvote/${voteRequest.postId}`, voteRequest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during downvote:', error);
        throw error;
    }
}

/**
 * Fetches upvote count for a specific post.
 * @param {string} postId - The ID of the post.
 * @param token
 * @returns {Promise<number>} - The number of upvotes for the post.
 */
export async function getUpvoteCount(postId, token) {
    try {
        const response = await axios.get(`${VOTE_API_URL}/upvote/${postId}/count`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // 返回该帖子的 upvote 计数
    } catch (error) {
        console.error('Error fetching upvote count:', error);
        throw error;
    }
}

/**
 * Checks if the user has voted on a specific post.
 * @param {Object} hasUserVotedRequest - The request object containing userId, postId, and postType.
 * @param token
 * @returns {Promise<number>} - Returns 1 if the user has voted, otherwise 0.
 */
export async function hasUserVoted(hasUserVotedRequest, token) {
    try {
        const response = await axios.post(`${VOTE_API_URL}/has-voted/${hasUserVotedRequest.postId}`, hasUserVotedRequest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // 返回是否已经投票的结果，1表示投票过，0表示未投票
    } catch (error) {
        console.error('Error checking if user has voted:', error);
        throw error;
    }
}

/**
 * Deletes a vote for a specific post.
 * @param {string} postId - The ID of the post for which the vote should be deleted.
 * @param token
 * @returns {Promise<string>} - A message indicating the result of the delete operation.
 */
export async function deleteVote(postId, token) {
    try {
        const response = await axios.delete(`${VOTE_API_URL}/delete-vote/${postId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // 返回删除成功的信息
    } catch (error) {
        console.error('Error deleting vote:', error);
        throw error;
    }
}