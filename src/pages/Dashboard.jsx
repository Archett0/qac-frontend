import React from 'react';
import { jwtDecode } from 'jwt-decode'

const Dashboard = () => {

  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const subject = decodedToken.sub;

  return (
    <div>
      <h1>Dashboard Page</h1>
      <h1>Subject: {subject}</h1>
    </div>
  );
};

export default Dashboard;
