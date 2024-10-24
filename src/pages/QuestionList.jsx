import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, TextField } from '@mui/material';
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.title}</TableCell>
                <TableCell>{question.content}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      component={Link}
                      to={`/questions/show/${question.id}`}
                      variant="contained"
                      color="primary"
                    >
                      View
                    </Button>
                    <Button
                      component={Link}
                      to={`/questions/update/${question.id}`}
                      variant="contained"
                      color="secondary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(question.id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuestionList;
