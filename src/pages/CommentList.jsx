import React, { useEffect, useState } from 'react';
import { Avatar, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { clickUpvote, getUpvoteCount } from '../services/VoteService';
import { jwtDecode } from 'jwt-decode';

const CommentList = ({ comments }) => {
  // the number of upvotes of comment
  const [upvotes, setUpvotes] = useState({}); // { commentId: upvoteCount }
  const decodeToken = jwtDecode(localStorage.getItem('jwtToken'));
  const userId = decodeToken.sub;

  // handle upvote click events
  const handleUpvote = async (commentId, ownerId) => {
    try {
      // to be change
      await clickUpvote({ userId: userId, postId: commentId, authorId: ownerId, authorEmail: 'no.need', postType: 'ANSWER' });
      // get the number of upvote after clicking
      const updatedCount = await getUpvoteCount(commentId);
      setUpvotes((prevUpvotes) => ({
        ...prevUpvotes,
        [commentId]: updatedCount,
      }));
    } catch (error) {
      console.error('Failed to upvote:', error);
    }
  };

  // get the upvotes of comments
  useEffect(() => {
    async function fetchUpvotes() {
      const initialUpvotes = {};
      for (let comment of comments) {
        try {
          const count = await getUpvoteCount(comment.id);  // Invoke the service that gets the number of upvotes
          initialUpvotes[comment.id] = count;
          // for test
          // console.log('upvote count of ', comment.id, ' is ', count);
        } catch (error) {
          console.error(`Failed to fetch upvotes for comment ${comment.id}:`, error);
        }
      }
      setUpvotes(initialUpvotes);  // Set the number of upvotes received
    }

    fetchUpvotes();
  }, [comments]);

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
    <div style={{ marginTop: '40px' }}>
      {comments.map((comment) => (
        <div key={comment.id} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
          <Avatar src={comment.avatar} style={{ marginRight: '10px' }} />
          <div style={{ flex: 1 }}>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>{comment.username}</Typography>
            <Typography variant="body2">{comment.content}</Typography>

            {/* Time and Like */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                {formatDate(comment.createdAt)}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton style={{ padding: '5px' }} 
                  onClick={() => handleUpvote(comment.id, comment.ownerId)}  // handle upvote click
                >
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" style={{ marginLeft: '5px' }}>
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
