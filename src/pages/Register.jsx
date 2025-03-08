import {Button, Box, Typography} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";

function Register() {
    const {loginWithRedirect} = useAuth0();

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
                Register with QAC
            </Typography>
            <br/><br/><br/>
            <Button type="button" variant="contained" fullWidth sx={{marginTop: 2}}
                    onClick={() => loginWithRedirect()}>
                Register with Auth0
            </Button>
        </Box>
    );
}

export default Register;
