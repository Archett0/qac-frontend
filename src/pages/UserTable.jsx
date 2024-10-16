import React, { useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Avatar, Button, CircularProgress 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchUsers } from '../services/userService'; // Import the service

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
  const [users, setUsers] = useState([]); // Store fetched users
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch users from the API when component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); // Call the service
        setUsers(data); // Set the users in state
      } catch (err) {
        setError('Failed to fetch users'); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getUsers(); // Invoke the fetch function
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress /> {/* Show loading spinner */}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>{error}</p> {/* Show error message */}
      </div>
    );
  }

  // Render the user table
  return (
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
  );
};

export default UserTable;
