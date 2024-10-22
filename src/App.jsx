import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import UserTable from './pages/UserTable';
import SignOut from './pages/SignOut';
import QuestionList from './pages/QuestionList';
import QuestionCreate from './pages/QuestionCreate';
import QuestionUpdate from './pages/QuestionUpdate';
import QuestionShow from './pages/QuestionShow';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Toolbar />
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/questions/list" element={<QuestionList />} />
            <Route path="/questions/create" element={<QuestionCreate />} />
            <Route path="/questions/update/:id" element={<QuestionUpdate />} />
            <Route path="/questions/show/:id" element={<QuestionShow />} />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
