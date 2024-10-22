import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import { fetchQuestionById, updateQuestion } from '../services/questionService'; // API service

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ title: '', content: '', ownerId: '', id: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const data = await fetchQuestionById(id);
        setQuestion(data); // 这里会设置整个 question 对象，包括 id, title, content, ownerId
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
      // 直接将整个 question 对象传递给 updateQuestion 方法
      await updateQuestion(question);
      navigate('/questions');
    } catch (err) {
      console.error('Failed to update question', err);
    } finally {
      setLoading(false);
    }
  };

  // 使用 handleChange 统一处理输入框的变化
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
      <TextField
        name="ownerId"
        label="Owner ID"
        value={question.ownerId}
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
