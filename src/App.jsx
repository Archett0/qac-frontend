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
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

function AppLayout({ children }) {
  const location = useLocation();

  const noLayoutPages = ['/login', '/register'];
  const isNoLayoutPage = noLayoutPages.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!isNoLayoutPage && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {!isNoLayoutPage && <Toolbar />}
        {!isNoLayoutPage && <Topbar />}
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
          <Route 
            path="/myaccount" 
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
