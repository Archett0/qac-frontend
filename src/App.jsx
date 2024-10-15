import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import UserTable from './pages/UserTable';
import Products from './pages/Products';
import Blog from './pages/Blog';
import SignOut from './pages/SignOut';

function App() {
  return (
    // The Router should be at the root level of your app, surrounding everything
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
            <Route path="/products" element={<Products />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
