import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const users = [
  { id: 1, name: 'Adam Trantow', company: 'Mohr, Langworth and Hills', role: 'UI Designer', verified: true, status: 'Active' },
  { id: 2, name: 'Angel Rolfson-Kulas', company: 'Koch and Sons', role: 'UI Designer', verified: true, status: 'Active' },
  { id: 3, name: 'Betty Hammes', company: 'Waelchi – VonRueden', role: 'UI Designer', verified: false, status: 'Banned' },
  { id: 4, name: 'Billy Braun', company: 'White, Cassin and Goldner', role: 'UI Designer', verified: true, status: 'Active' },
  { id: 5, name: 'Billy Stoltenberg', company: 'Medhurst, Moore and Franey', role: 'Leader', verified: true, status: 'Banned' },
];

const getStatusButton = (status) => {
  if (status === 'Active') {
    return <Button variant="contained" color="success" size="small">Active</Button>;
  } else {
    return <Button variant="contained" color="error" size="small">Banned</Button>;
  }
};

const UserTable = () => {
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
                <Avatar alt={user.name} src={`https://i.pravatar.cc/300?u=${user.id}`} />
                {user.name}
              </TableCell>
              <TableCell>{user.company}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.verified ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
              </TableCell>
              <TableCell>{getStatusButton(user.status)}</TableCell>
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
