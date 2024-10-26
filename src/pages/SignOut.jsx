import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('jwtToken');

    navigate('/login');
  }, [navigate]);

  return <h1>Signing out...</h1>;
};

export default SignOut;
