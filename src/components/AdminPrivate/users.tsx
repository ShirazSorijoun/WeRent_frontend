/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '../../services/user-service';
import { IUser } from '../../services/user-service';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import { getToken } from '@/api';

const AllUsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const token: string | null = await getToken();
      if (!token) return;

      try {
        const { req } = getAllUsers(token || '');
        const response = await req;
        const filteredUsers = response.data.filter(
          (user) => user.roles !== 'admin',
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.log('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const rows = users.map((user, index) => ({
    _id: index,
    id: user._id,
    Name: user.name,
    Email: user.email,
    Role: user.roles,
  }));

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleDeleteClick = async () => {
    const token: string | null = await getToken();
    if (!token) return;

    try {
      for (const row of rows) {
        if (selected.includes(row._id)) {
          if (row.id) {
            const userIdString = row.id.toString();
            console.log(`Deleting user with ID: ${userIdString}`);
            await deleteUser(userIdString, token || '');
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== row.id),
            );
          }
        }
      }
      setSelected([]);
      console.log('Selected users deleted successfully');
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '400px',
        marginTop: '100px',
      }}
    >
      <Box sx={{ width: '80%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDeleteClick={handleDeleteClick}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.Name}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">{row.Role}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default AllUsersAdmin;
