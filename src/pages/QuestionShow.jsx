import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestionById } from '../services/questionService'; // API service
import { CircularProgress, Typography, Paper, Divider } from '@mui/material';

const ShowQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const data = await fetchQuestionById(id);
        setQuestion(data);
      } catch (err) {
        setError('Failed to load question');
      } finally {
        setLoading(false);
      }
    };
    getQuestion();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Paper style={{ padding: '24px', marginTop: '20px' }}>
      {/* 标题 */}
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        {question.title}
      </Typography>
      
      <Divider style={{ margin: '20px 0' }} />

      {/* 内容 */}
      <Typography 
        variant="body1" 
        style={{ lineHeight: '1.8', fontSize: '1.2rem', textAlign: 'justify' }}
      >
        {question.content}
      </Typography>

      <Divider style={{ margin: '20px 0' }} />

    </Paper>
  );
};

export default ShowQuestion;
