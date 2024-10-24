import axios from "axios";
import { API_HOST } from "../config/apiconfig";

const VOTE_API_URL = '${API_HOST/vote}';

/**
 * Send an upvote request to the API.
 * @param {Object} voteRequest The vote request payload containing necessary vote data.
 * @returns {Promise} A promise that resolves to the server's response
 */
export async function clickUpvote(voteRequest) {
    try {
        const response = await axios.post(`${VOTE_API_URL}/upvote/${voteRequest.postId}`, voteRequest);
        return response.data;
    } catch (error) {
        console.error('Error during upvote:', error);
        throw error;
    }
}

/**
 * Send a downvote request to the API.
 * @param {Object} voteRequest The vote request payload containing necessary vote data.
 * @returns {Promise} A promise that resolves to the server's response
 */
export async function clickDownvote(voteRequest) {
    try {
        const response = await axios.post(`${VOTE_API_URL}/downvote/${voteRequest.postId}`, voteRequest);
        return response.data;
    } catch (error) {
        console.error('Error during downvote:', error);
        throw error;
    }
}

/**
 * Fetches upvote count for a specific post.
 * @param {string} postId - The ID of the post.
 * @returns {Promise<number>} - The number of upvotes for the post.
 */
export async function getUpvoteCount(postId) {
    try {
        const response = await axios.get(`${VOTE_API_URL}/upvote/${postId}/count`);
        return response.data; // 返回该帖子的 upvote 计数
    } catch (error) {
        console.error('Error fetching upvote count:', error);
        throw error;
    }
}

/**
 * Checks if the user has voted on a specific post.
 * @param {Object} hasUserVotedRequest - The request object containing userId, postId, and postType.
 * @returns {Promise<number>} - Returns 1 if the user has voted, otherwise 0.
 */
export async function hasUserVoted(hasUserVotedRequest) {
    try {
        const response = await axios.post(`${VOTE_API_URL}/has-voted/${hasUserVotedRequest.postId}`, hasUserVotedRequest);
        return response.data; // 返回是否已经投票的结果，1表示投票过，0表示未投票
    } catch (error) {
        console.error('Error checking if user has voted:', error);
        throw error;
    }
}