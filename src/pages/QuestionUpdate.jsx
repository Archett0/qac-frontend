import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import { fetchQuestionById, updateQuestion } from '../services/questionService';

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ title: '', content: '', ownerId: '', id: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const data = await fetchQuestionById(id);
        setQuestion(data);
      } catch (err) {
        console.error('Failed to load question', err);
      } finally {
        setLoading(false);
      }
    };
    getQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateQuestion({ title: question.title, content: question.content, id: question.id }); // 不包含 ownerId
      navigate('/questions');
    } catch (err) {
      console.error('Failed to update question', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={question.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="content"
        label="Content"
        value={question.content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Update'}
      </Button>
    </form>
  );
};

export default UpdateQuestion;
