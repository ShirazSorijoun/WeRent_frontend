/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import './userProfile.css';
import { UserApartmentsContainer, UserDetails } from './components';
import { Container, Grid } from '@mui/material';
import { api } from '@/api';
import { ILeaseAgreement, ILeaseAgreementMap } from '@/models/leaseAgreement';
import { useAppSelector } from '@/hooks';
import { selectUser } from '@/stores/user';
import { UserRentingApartmentsContainer } from './components/userApartments';

export const UserPage: React.FC = () => {
  const [leasesMap, setLeasesMap] = useState<ILeaseAgreementMap>({});

  const userData = useAppSelector(selectUser);

  const fetchLeaseData = useCallback(async (): Promise<void> => {
    if (!userData.userId) return;

    try {
      const res: ILeaseAgreement[] =
        await api.leaseAgreement.getLeaseAgreementList();

      const leasesFromBE: ILeaseAgreementMap = {};

      res.forEach((lease) => {
        leasesFromBE[userData.userId] = lease;
      });

      setLeasesMap(leasesFromBE);
    } catch (error) {
      console.error('Error fetching tenant data for lease form', error);
    }
  }, [userData.userId]);

  useEffect(() => {
    fetchLeaseData();
  }, [fetchLeaseData]);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        columns={2}
        justifyContent="center"
        sx={{ marginTop: 0 }}
      >
        <Grid item xs={1}>
          <UserDetails userData={userData} />
        </Grid>
        <Grid item xs={1}>
          <UserApartmentsContainer leaseMap={leasesMap} />
        </Grid>
        <Grid item xs={1}>
          <UserRentingApartmentsContainer
            leaseMap={leasesMap}
            userId={userData.userId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
