import React, { useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Avatar, Button, CircularProgress, TextField 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchUsers } from '../services/userService'; 
import { searchUsers } from '../services/searchService'; 

const getStatusButton = (status) => (
  <Button 
    variant="contained" 
    color={status === 'Active' ? 'success' : 'error'} 
    size="small"
  >
    {status}
  </Button>
);

const UserTable = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchKeyword, setSearchKeyword] = useState(''); 

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); 
        setUsers(data); 
      } catch (err) {
        setError('Failed to fetch users'); 
      } finally {
        setLoading(false); 
      }
    };

    getUsers(); 
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchUsers(searchKeyword);
      setUsers(data);
    } catch (err) {
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress /> 
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>{error}</p> 
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <TextField
          label="Search Users"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          variant="outlined"
          style={{ flexGrow: 1 }}
        />
        <Button onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar alt={user.username} src={`https://i.pravatar.cc/300?u=${user.id}`} />
                    {user.username}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === 'USER' ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell>{getStatusButton(user.status || 'Active')}</TableCell>
                <TableCell>
                  <MoreVertIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
