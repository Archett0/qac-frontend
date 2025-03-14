import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, CircularProgress, IconButton, Paper, TextField, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {fetchAllQuestions, deleteQuestion} from '../services/questionService';
import {searchQuestions} from '../services/searchService';
import {useAuth0} from '@auth0/auth0-react';

const QuestionList = () => {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    useEffect(() => {
        const getQuestions = async () => {
            if (!isLoading && isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    const data = await fetchAllQuestions(token);
                    setQuestions(data);
                } catch (error) {
                    setError('Failed to load questions');
                } finally {
                    setLoading(false);
                }
            }
        };
        getQuestions();
    }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                const token = await getAccessTokenSilently();
                await deleteQuestion(id, token);
                setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
            } catch (err) {
                console.error('Failed to delete question', err);
            }
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const token = await getAccessTokenSilently();
            const data = await searchQuestions(searchKeyword, token);
            setQuestions(data);
        } catch (err) {
            setError('Failed to search questions');
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const displayedQuestions = questions.slice(startIndex, endIndex);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
                <TextField
                    label="Search Questions"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    variant="outlined"
                    style={{flexGrow: 1}}
                />
                <Button onClick={handleSearch} variant="contained" color="primary">
                    Search
                </Button>
            </div>

            <Paper style={{padding: '16px'}}>
                {displayedQuestions.map((question) => (
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
                        <Avatar src={question.avatar || 'https://via.placeholder.com/150'}
                                style={{marginRight: '10px'}}/>
                        <div style={{flex: 1}}>
                            <Typography variant="h6" style={{fontWeight: 'bold'}}>
                                {question.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{marginBottom: '8px'}}>
                                {question.content}
                            </Typography>

                            <div
                                style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px'}}>
                                <IconButton
                                    component={Link}
                                    to={`/questions/show/${question.id}`}
                                    color="primary"
                                    size="small"
                                >
                                    <VisibilityIcon/>
                                </IconButton>
                                {user['https://your-domain.com/uuid'] === question.ownerId && (
                                    <>
                                        <IconButton
                                            component={Link}
                                            to={`/questions/update/${question.id}`}
                                            color="secondary"
                                            size="small"
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(question.id)}
                                            color="error"
                                            size="small"
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px'}}>
                    <IconButton onClick={handlePreviousPage} disabled={currentPage === 1} style={{marginRight: '8px'}}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="body1" style={{margin: '0 16px'}}>
                        Page {currentPage}
                    </Typography>
                    <IconButton onClick={handleNextPage} disabled={endIndex >= questions.length}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </div>
            </Paper>
        </div>
    );
};

export default QuestionList;
