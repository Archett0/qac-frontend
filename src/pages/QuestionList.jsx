import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, CircularProgress, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAllQuestions, deleteQuestion } from '../services/questionService';
import { searchQuestions } from '../services/searchService';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchAllQuestions();
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchQuestions(searchKeyword);
      setQuestions(data);
    } catch (err) {
      setError('Failed to search questions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <TextField
          label="Search Questions"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          variant="outlined"
          style={{ flexGrow: 1 }}
        />
        <Button onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button>
      </div>

      <Paper style={{ padding: '16px' }}>
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '25px', 
              paddingBottom: '15px',
              borderBottom: '1px solid #ccc', 
            }}
          >
            <Avatar src={question.avatar || 'https://via.placeholder.com/150'} style={{ marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}> 
                {question.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginBottom: '8px' }}>
                {question.content}
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                <IconButton
                  component={Link}
                  to={`/questions/show/${question.id}`}
                  color="primary"
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`/questions/update/${question.id}`}
                  color="secondary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(question.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default QuestionList;
