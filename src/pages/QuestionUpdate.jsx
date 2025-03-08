import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {TextField, Button, CircularProgress} from '@mui/material';
import {fetchQuestionById, updateQuestion} from '../services/questionService';
import {useAuth0} from "@auth0/auth0-react";

const UpdateQuestion = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({title: '', content: '', ownerId: '', id: ''});
    const [loading, setLoading] = useState(true);
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await fetchQuestionById(id, token);
                setQuestion(data);
            } catch (err) {
                console.error('Failed to load question', err);
            } finally {
                setLoading(false);
            }
        };
        getQuestion();
    }, [getAccessTokenSilently, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await getAccessTokenSilently();
            await updateQuestion({
                title: question.title,
                content: question.content,
                id: question.id,
                ownerId: user['https://your-domain.com/uuid']
            }, token); // 不包含 ownerId
            navigate('/questions/list');
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
                {loading ? <CircularProgress size={24}/> : 'Update'}
            </Button>
        </form>
    );
};

export default UpdateQuestion;
