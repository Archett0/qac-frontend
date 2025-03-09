import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

const SignOut = () => {
    const navigate = useNavigate();
    const {logout} = useAuth0();

    useEffect(() => {
        logout({logoutParams: {returnTo: 'https://localhost:5173/login'}});
        navigate('/login');
    }, [logout, navigate]);

    return <h1>Sign out success</h1>;
};

export default SignOut;
