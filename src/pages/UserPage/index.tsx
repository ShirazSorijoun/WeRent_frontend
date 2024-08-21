/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './userProfile.css';
import { UserApartmentsContainer, UserDetails } from './components';
import { Container, Stack } from '@mui/material';

export const UserPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3} alignItems="center">
        <UserDetails />

        <UserApartmentsContainer />
      </Stack>
    </Container>
  );
};
