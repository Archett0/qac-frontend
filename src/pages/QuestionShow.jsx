import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestionById } from '../services/questionService';
import { createAnswer, fetchAnswersByQuestionId, deleteAnswerById } from '../services/AnswerService';
import { CircularProgress, Typography, Paper, Divider, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestionAndAnswers = async () => {
      try {
        const questionData = await fetchQuestionById(id);
        setQuestion(questionData);
        const answerData = await fetchAnswersByQuestionId(id);
        setAnswers(answerData);
      } catch (err) {
        setError('Failed to load question or answers');
      } finally {
        setLoading(false);
      }
    };
    getQuestionAndAnswers();
  }, [id]);

  const handleCreateAnswer = async () => {
    try {
      const answerData = {
        content: newAnswer,
        questionId: id 
      };
      const createdAnswer = await createAnswer(answerData);
      setAnswers([...answers, createdAnswer]);
      setNewAnswer(''); 
    } catch (err) {
      console.error('Failed to create answer:', err);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteAnswerById(answerId);
      setAnswers(answers.filter((answer) => answer.id !== answerId));
    } catch (err) {
      console.error('Failed to delete answer:', err);
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
          <IconButton
            aria-label="delete"
            style={{ position: 'absolute', right: '8px', top: '8px' }}
            onClick={() => handleDeleteAnswer(answer.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Paper>
  );
};

export default ShowQuestion;
