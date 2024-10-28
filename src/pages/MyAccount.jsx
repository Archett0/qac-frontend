import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, CircularProgress, IconButton, Paper, Typography, Divider, Box } from '@mui/material';
import { Email, AccountCircle } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { jwtDecode } from 'jwt-decode';
import { fetchQuestionsByOwnerId, deleteQuestion } from '../services/questionService';

const MyAccount = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.sub);
        setUsername(decodedToken.username); 
        setEmail(decodedToken.email); 
      } catch (err) {
        console.error('Failed to decode token', err);
      }
    }

    const getQuestions = async () => {
      try {
        const data = await fetchQuestionsByOwnerId(currentUserId);
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      getQuestions();
    }
  }, [currentUserId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(id);
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
      } catch (err) {
        console.error('Failed to delete question', err);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <Avatar alt="User Avatar" src="https://i.pravatar.cc/150?img=10" sx={{ width: '80px', height: '80px', margin: '0 auto' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
          {username}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '8px' }}>
          <AccountCircle sx={{ color: 'gray', marginRight: '4px' }} />
          <Typography variant="body1" color="textSecondary">
            {username}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '4px' }}>
          <Email sx={{ color: 'gray', marginRight: '4px' }} />
          <Typography variant="body1" color="textSecondary">
            {email}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          My Questions
        </Typography>
        <Divider sx={{ marginBottom: '16px' }} />
        {questions.map((question) => (
          <Box
            key={question.id}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '15px 0',
              borderBottom: '1px solid #ccc',
              marginBottom: '15px',
            }}
          >
            <Avatar src={question.avatar || 'https://via.placeholder.com/150'} sx={{ marginRight: '10px' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {question.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px' }}>
                {question.content}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                <IconButton component={Link} to={`/questions/show/${question.id}`} color="primary" size="small">
                  <VisibilityIcon />
                </IconButton>
                <IconButton component={Link} to={`/questions/update/${question.id}`} color="secondary" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(question.id)} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default MyAccount;
