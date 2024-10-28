import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, CircularProgress, IconButton, Paper, Typography, Divider, Box } from '@mui/material';
import { Email, AccountCircle, Security, QuestionAnswer } from '@mui/icons-material'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { jwtDecode } from 'jwt-decode';
import { fetchQuestionsByOwnerId, deleteQuestion } from '../services/questionService';
import { fetchUserProfile } from '../services/userService';

const MyAccount = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.sub);
      } catch (err) {
        console.error('Failed to decode token', err);
      }
    }
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile(currentUserId);
        setUsername(userProfile.username);
        setEmail(userProfile.email);
        setRole(userProfile.role || 'No Role Assigned'); 
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load user information');
      }
    };

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
      getUserProfile();
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
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '12px' }}>
          <Box display="flex" alignItems="center" sx={{ marginRight: '16px' }}>
            <AccountCircle sx={{ color: 'gray', marginRight: '4px' }} />
            <Typography variant="body1" color="textSecondary">
              {username}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ marginRight: '16px' }}>
            <Email sx={{ color: 'gray', marginRight: '4px' }} />
            <Typography variant="body1" color="textSecondary">
              {email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Security sx={{ color: 'gray', marginRight: '4px' }} />
            <Typography variant="body1" color="textSecondary">
              {role}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ padding: '16px' }}>
        <Box display="flex" alignItems="center" sx={{ marginBottom: '16px' }}>
          <QuestionAnswer sx={{ color: 'primary.main', marginRight: '8px' }} /> {/* 恢复图标 */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              borderBottom: '3px solid', 
              borderColor: 'primary.main', 
              display: 'inline-block',
              paddingBottom: '4px' 
            }}
          >
            My Questions
          </Typography>
        </Box>
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
