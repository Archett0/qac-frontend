import {Button, Box, Typography, Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function LoginPage() {
    const { loginWithRedirect } = useAuth0();

    return (
        <Box
            sx={{
                width: 400,
                margin: 'auto',
                marginTop: '100px',
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h5" component="h1" sx={{textAlign: 'center', marginBottom: 2}}>
                QAC Sign in
            </Typography>

            <Typography variant="body2" sx={{textAlign: 'center', marginBottom: 2}}>
                Don’t have an account?{' '}
                <Link component={RouterLink} to="/register" underline="hover">
                    Get started
                </Link>
            </Typography>

            <Button
                type="button"
                variant="contained"
                fullWidth
                sx={{marginTop: 2, marginBottom: 2}}
                onClick={() => loginWithRedirect()}
            >
                Sign in with Auth0
            </Button>
        </Box>
    );
}

export default LoginPage;
