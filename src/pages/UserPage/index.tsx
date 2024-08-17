/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './userProfile.css';
import { LeaseAgreementFormDialog } from '@@/CreateLeaseAgreement';
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

  const [leaseDialogOpen, setLeaseDialogOpen] = useState(false);
  const openLeaseDialog = () => {
    setLeaseDialogOpen(true);
  };

  const closeLeaseDialog = () => {
    setLeaseDialogOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Stack>
        <div>
          {/* Button to trigger the LeaseAgreementForm dialog */}
          <Button onClick={openLeaseDialog}>Open Lease Agreement Form</Button>
          <LeaseAgreementFormDialog
            isOpen={leaseDialogOpen}
            handleCancel={closeLeaseDialog}
            completeSave={() => {
              closeLeaseDialog();
            }}
          />
        </div>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <UserDetails />

          <div style={{ marginTop: '30px', marginBottom: '20px' }}>
            {!isUserWithGoogle && <UserChangePassword />}

            <UserApartmentsContainer />
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};
