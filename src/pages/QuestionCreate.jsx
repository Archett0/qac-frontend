import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../services/questionService'; 

const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const ownerId = '550e8400-e29b-41d4-a716-446655440000';
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createQuestion({ title, content, ownerId });
      navigate('/questions'); 
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