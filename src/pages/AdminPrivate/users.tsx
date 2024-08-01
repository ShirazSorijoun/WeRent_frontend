/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
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
import { api } from '@/api';
import { IUser } from '@/models';

export const AllUsersAdminPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      try {
        const allUsers = await api.user.getAllUsers();
        const filteredUsers = allUsers.filter((user) => !user.isAdmin);
        setUsers(filteredUsers);
      } catch (error) {
        console.log('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const rows = useMemo(
    () =>
      users.map((user, index) => ({
        ...user,
        _id: index,
        id: user._id,
      })),
    [users],
  );

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
    try {
      for (const row of rows) {
        if (selected.includes(row._id)) {
          if (row.id) {
            const userIdString = row.id.toString();
            console.log(`Deleting user with ID: ${userIdString}`);
            await api.user.deleteUser(userIdString);
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
                      <TableCell align="center">{`${row.firstName} ${row.lastName}`}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
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
