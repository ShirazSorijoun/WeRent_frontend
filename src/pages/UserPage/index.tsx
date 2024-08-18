/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './userProfile.css';
import {
  UserApartmentsContainer,
  UserChangePassword,
  UserDetails,
} from './components';
import { useAppSelector } from '@/hooks/store';
import { selectIsUserWithGoogle } from '@/stores/user';
import { Container, Stack } from '@mui/material';

export const UserPage: React.FC = () => {
  const isUserWithGoogle = useAppSelector(selectIsUserWithGoogle);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <UserDetails />

        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
          {!isUserWithGoogle && <UserChangePassword />}

          <UserApartmentsContainer />
        </div>
      </Stack>
    </Container>
  );
};
