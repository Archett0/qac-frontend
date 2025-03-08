import React, {useEffect, useState} from 'react';
import {Avatar, Typography, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {clickUpvote, getUpvoteCount} from '../services/VoteService';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAuth0} from "@auth0/auth0-react";

const CommentList = ({comments, onDeleteComment}) => {
    const [upvotes, setUpvotes] = useState({}); // { commentId: upvoteCount }
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

    // handle upvote click events
    const handleUpvote = async (commentId, ownerId) => {
        try {
            const token = await getAccessTokenSilently();
            await clickUpvote({
                userId: user['https://your-domain.com/uuid'],
                postId: commentId,
                authorId: ownerId,
                authorEmail: 'no.need',
                postType: 'ANSWER'
            }, token);
            const updatedCount = await getUpvoteCount(commentId, token);
            setUpvotes((prevUpvotes) => ({
                ...prevUpvotes,
                [commentId]: updatedCount,
            }));
        } catch (error) {
            console.error('Failed to upvote:', error);
        }
    };

    const handleDelete = (commentId) => {
        onDeleteComment(commentId);
    };

    // get the upvotes of comments
    useEffect(() => {
        async function fetchUpvotes() {
            const token = await getAccessTokenSilently();
            const initialUpvotes = {};
            for (let comment of comments) {
                try {
                    const count = await getUpvoteCount(comment.id, token);
                    initialUpvotes[comment.id] = count;
                } catch (error) {
                    console.error(`Failed to fetch upvotes for comment ${comment.id}:`, error);
                }
            }
            setUpvotes(initialUpvotes);
        }

        fetchUpvotes();
    }, [comments, getAccessTokenSilently]);

    const formatDate = (createdAt) => {
        const commentDate = new Date(createdAt);
        const now = new Date();
        const diffInMs = now - commentDate;

        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInMinutes = Math.floor((diffInMs / (1000 * 60)) % 60);

        if (diffInMs < 24 * 60 * 60 * 1000) {
            if (diffInHours > 0) {
                return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
            } else {
                return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
            }
        } else {
            return commentDate.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(',', '');
        }
    };

    return (
        <div style={{marginTop: '40px'}}>
            {comments.map((comment) => (
                <div key={comment.id} style={{display: 'flex', alignItems: 'flex-start', marginBottom: '15px'}}>
                    <Avatar src={comment.avatar} style={{marginRight: '10px'}}/>
                    <div style={{flex: 1}}>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>{comment.username}</Typography>
                        <Typography variant="body2">{comment.content}</Typography>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="caption" color="textSecondary">
                                {formatDate(comment.createdAt)}
                            </Typography>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {user['https://your-domain.com/uuid'] === comment.ownerId && (
                                    <IconButton style={{padding: '5px'}} onClick={() => handleDelete(comment.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                )}
                                <IconButton style={{padding: '5px'}}
                                            onClick={() => handleUpvote(comment.id, comment.ownerId)}>
                                    <FavoriteIcon/>
                                </IconButton>
                                <Typography variant="body2" style={{marginLeft: '5px'}}>
                                    {upvotes[comment.id] || 0}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
