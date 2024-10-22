import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { fetchAllQuestions, deleteQuestion } from '../services/questionService'; // 导入删除函数

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id)); // 删除后更新前端列表
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
                <Button component={Link} to={`/questions/show/${question.id}`} variant="contained" color="primary" style={{ marginRight: '8px' }}>
                  View
                </Button>
                <Button component={Link} to={`/questions/update/${question.id}`} variant="contained" color="secondary" style={{ marginRight: '8px' }}>
                  Update
                </Button>
                <Button onClick={() => handleDelete(question.id)} variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionList;
