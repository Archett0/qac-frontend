import React, { useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Avatar, Button, CircularProgress, TextField, IconButton, Select, MenuItem, ListItemIcon, ListItemText 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUsers, fetchUserProfile, updateUser, deleteUser } from '../services/userService'; 
import { searchUsers } from '../services/searchService';
import { jwtDecode } from 'jwt-decode';

const getStatusButton = (status) => (
  <Button 
    variant="contained" 
    color={status === 'Active' ? 'success' : 'error'} 
    size="small"
  >
    {status}
  </Button>
);

const getRoleButton = (role) => (
  <Button 
    variant="contained" 
    color={role === 'ADMIN' ? 'success' : 'info'} 
    size="small"
  >
    {role}
  </Button>
);

const UserTable = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchKeyword, setSearchKeyword] = useState(''); 
  const [role, setRole] = useState(''); 
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [editableUserId, setEditableUserId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.sub);
      } catch (err) {
        console.error('Failed to decode token', err);
      }
    }
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile(currentUserId);
        setRole(userProfile.role || 'No Role Assigned'); 
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load user information');
      }
    };


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

    if (currentUserId) {
      getUserProfile();
    }
    getUsers();
  }, [currentUserId]);

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

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    const updatedUser = users.find((user) => user.id === id);
    if (updatedUser) {
      updatedUser.role = newRole;
      try {
        await updateUser(id, updatedUser);
        setEditableUserId(null); 
        alert('Role updated successfully');
      } catch (err) {
        console.error('Failed to update role', err);
        alert('Failed to update role');
      }
    }
  };

  const handleUpdateClick = (id) => {
    setEditableUserId(id);
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
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Role</TableCell>
              {/* <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Verified</TableCell> */}
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Actions</TableCell>
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
                <TableCell>
                  {editableUserId === user.id && role === 'ADMIN' ? (
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      displayEmpty
                      renderValue={(value) => value || 'Select Role'}
                    >
                      <MenuItem value="USER">
                        <ListItemIcon>
                          <PersonIcon style={{ color: 'blue' }} />
                        </ListItemIcon>
                        <ListItemText primary="USER" />
                      </MenuItem>
                      <MenuItem value="ADMIN">
                        <ListItemIcon>
                          <AdminPanelSettingsIcon style={{ color: 'green' }} />
                        </ListItemIcon>
                        <ListItemText primary="ADMIN" />
                      </MenuItem>
                    </Select>
                  ) : (
                    getRoleButton(user.role)
                  )}
                </TableCell>
                {/* <TableCell>{user.role === 'USER' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell> */}
                <TableCell>{getStatusButton(user.status || 'Active')}</TableCell>
                <TableCell>
                  {role === 'ADMIN' && (
                    <>
                      <IconButton color="secondary" onClick={() => handleUpdateClick(user.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
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
