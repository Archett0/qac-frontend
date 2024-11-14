import React from 'react';
import { jwtDecode } from 'jwt-decode';
import QuestionList from './QuestionList';

const Dashboard = () => {

  return (
    <div>
      {/* <h1>Dashboard Page</h1>
      <h1>Subject: {subject}</h1> */}
      <QuestionList></QuestionList>
    </div>
  );
};

export default Dashboard;
