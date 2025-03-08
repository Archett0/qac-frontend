import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../services/questionService'; 
import { jwtDecode } from 'jwt-decode'
import {useAuth0} from "@auth0/auth0-react";

const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const ownerId = user['https://your-domain.com/uuid']
      await createQuestion({ title, content, ownerId }, token);
      navigate('/questions/list'); 
    } catch (err) {
      console.error('Failed to create question', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} fullWidth margin="normal" required />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Create'}
      </Button>
    </form>
  );
};

export default CreateQuestion;