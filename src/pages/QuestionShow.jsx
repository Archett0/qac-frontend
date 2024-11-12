import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { fetchQuestionById } from '../services/questionService';
import { sendComment, fetchCommentsByAnswerId, deleteCommentByAnswerId, deleteComment } from '../services/eventService';
import { createAnswer, fetchAnswersByQuestionId, deleteAnswerById } from '../services/AnswerService';
import { clickUpvote, getUpvoteCount } from '../services/VoteService'; // upvote
import { CircularProgress, Typography, Paper, Divider, Button, TextField, IconButton, Avatar } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentList from './CommentList'; 
import { fetchUserProfile } from '../services/userService'; 
import { jwtDecode } from 'jwt-decode';
import PersonIcon from '@mui/icons-material/Person';

const ShowQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentPanels, setCommentPanels] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState(''); 
  const [upvotes, setUpvotes] = useState({}); 
  const [username, setUsername] = useState(''); 

  const decodeToken = jwtDecode(localStorage.getItem('jwtToken'));
  const userId = decodeToken.sub;

  useEffect(() => {
    const getQuestionAndAnswers = async () => {
      try {
        const questionData = await fetchQuestionById(id);
        setQuestion(questionData);


        if (questionData.ownerId) {
          const userProfile = await fetchUserProfile(questionData.ownerId);
          setUsername(userProfile.username);
        }

        const answerData = await fetchAnswersByQuestionId(id);
        setAnswers(answerData);

        const initialCommentPanels = {};
        answerData.forEach((answer) => {
          initialCommentPanels[answer.id] = false;
          fetchUpvoteCount(answer.id); 
        });
        setCommentPanels(initialCommentPanels);
      } catch (err) {
        setError('Failed to load question or answers');
      } finally {
        setLoading(false);
      }
    };
    getQuestionAndAnswers();
  }, [id]);


  const fetchUpvoteCount = async (answerId) => {
    try {
      const count = await getUpvoteCount(answerId);
      setUpvotes((prevUpvotes) => ({
        ...prevUpvotes,
        [answerId]: count,
      }));
    } catch (error) {
      console.error('Failed to fetch upvote count:', error);
    }
  };

  const handleUpvoteClick = async (answerId, ownerId) => {
    try {
      await clickUpvote({ userId: userId, postId: answerId, authorId: ownerId, authorEmail: 'no.need', postType: 'ANSWER' });
      fetchUpvoteCount(answerId);
    } catch (error) {
      console.error('Failed to upvote:', error);
    }
  };

  const handleCreateAnswer = async () => {
    try {
      const answerData = { content: newAnswer, questionId: id, ownerId: userId };
      const createdAnswer = await createAnswer(answerData);
      setAnswers([...answers, createdAnswer]);
      setNewAnswer('');
    } catch (err) {
      console.error('Failed to create answer:', err);
    }
  };


  const toggleCommentPanel = async (answerId) => {
    setCommentPanels((prevPanels) => ({
      ...prevPanels,
      [answerId]: !prevPanels[answerId],
    }));

    if (!commentPanels[answerId] && !comments[answerId]) {
      try {
        const fetchedComments = await fetchCommentsByAnswerId(answerId);
        setComments((prevComments) => ({
          ...prevComments,
          [answerId]: fetchedComments,
        }));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }
  };


  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteAnswerById(answerId);
      await deleteCommentByAnswerId(answerId);
      setAnswers(answers.filter((answer) => answer.id !== answerId));
    } catch (err) {
      console.error('Failed to delete answer:', err);
    }
  };


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };


  const handleDeleteComment = async (commentId, answerId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => ({
        ...prevComments,
        [answerId]: prevComments[answerId].filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };
  
  

  const handleCommentSubmit = async (answerId) => {
    try {
      const createdComment = await sendComment(userId, answerId, newComment);
      setComments((prevComments) => ({
        ...prevComments,
        [answerId]: [
          ...(prevComments[answerId] || []),
          createdComment, 
        ],
      }));
      setNewComment(''); 
    } catch (error) {
      console.error('Failed to send comment:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Paper style={{ padding: '24px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        {question.title}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
        <PersonIcon style={{ color: '#3f51b5', marginRight: '8px' }} />
        <Typography
          variant="h6"
          align="center"
          style={{ fontWeight: 'bold', color: '#3f51b5' }} 
        >
          {username}
        </Typography>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="body1" style={{ lineHeight: '1.8', fontSize: '1.2rem', textAlign: 'justify' }}>
        {question.content}
      </Typography>
      <Divider style={{ margin: '20px 0' }} />

      <TextField
        label="Your Answer"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        fullWidth
        margin="normal"
        multiline
      />
      <Button variant="contained" color="primary" onClick={handleCreateAnswer}>
        Submit Answer
      </Button>
      <Divider style={{ margin: '20px 0' }} />

      {answers.map((answer) => (
        <Paper key={answer.id} style={{ padding: '16px', marginBottom: '10px', position: 'relative' }}>
          <Typography variant="body2">{answer.content}</Typography>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div>
              <Button
                variant="outlined"
                startIcon={<ThumbUpAltIcon />}
                style={{ borderRadius: '5px', padding: '5px 10px' }}
                onClick={() => handleUpvoteClick(answer.id, answer.ownerId)} // handle upvote
              >
                {upvotes[answer.id] || 0} {/* 显示点赞数 */}
              </Button>
              <IconButton style={{ borderRadius: '5px', padding: '5px', marginLeft: 2 }}>
                <ThumbDownAltIcon />
              </IconButton>
              <IconButton style={{ marginLeft: 20 }} onClick={() => toggleCommentPanel(answer.id)}>
                <CommentIcon />
              </IconButton>
              {commentPanels[answer.id] && (
                <span style={{ marginLeft: 5 }}>
                  {comments[answer.id] ? comments[answer.id].length : 0} comments
                </span>
              )}
            </div>
            {/* Delete Answer */}
            <IconButton aria-label="delete" onClick={() => handleDeleteAnswer(answer.id)}>
              <DeleteIcon />
            </IconButton>
          </div>

          {commentPanels[answer.id] && (
            <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
              {/* Input Comment */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Avatar src='/path-to-user-avatar.jpg' style={{ marginRight: '10px' }} />
                  <TextField
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={5}
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder='Please input Comment'
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={!newComment}
                  style={{ marginTop: '8px', marginLeft: '50px' }}
                  onClick={() => handleCommentSubmit(answer.id)} 
                >
                  Submit Comment
                </Button>
              </div>


              <CommentList comments={comments[answer.id] || []} onDeleteComment={(commentId) => handleDeleteComment(commentId, answer.id)} />

              {/* <CommentList comments={comments[answer.id] || []} /> */}
            </div>
          )}
        </Paper>
      ))}
    </Paper>
  );
};

export default ShowQuestion;
