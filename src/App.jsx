import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function AppLayout({ children }) {
  const location = useLocation(); // 获取当前路径

  // 如果路径是 /login，则不渲染 Sidebar 和 Topbar
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!isLoginPage && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {!isLoginPage && <Toolbar />}
        {!isLoginPage && <Topbar />}
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <UserTable />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/questions/list" 
            element={
              <ProtectedRoute>
                <QuestionList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/questions/create" 
            element={
              <ProtectedRoute>
                <QuestionCreate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/questions/update/:id" 
            element={
              <ProtectedRoute>
                <QuestionUpdate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/questions/show/:id" 
            element={
              <ProtectedRoute>
                <QuestionShow />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
