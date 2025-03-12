import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../services/questionService';
import DOMPurify from 'dompurify';
import {useAuth0} from "@auth0/auth0-react";

const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (title.trim().length < 5) {
      setError("Minimum title length is 5");
      return;
    }
    if (content.trim() === '') {
      setError("Content cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const ownerId = user['https://your-domain.com/uuid']
      const cleanTitle = DOMPurify.sanitize(title);
      const cleanContent = DOMPurify.sanitize(content);
      await createQuestion({ title: cleanTitle, content: cleanContent, ownerId }, token);
      navigate('/questions/list'); 
    } catch (err) {
      console.error('Failed to create question', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} fullWidth margin="normal" required />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Create'}
      </Button>
    </form>
  );
};

export default CreateQuestion;