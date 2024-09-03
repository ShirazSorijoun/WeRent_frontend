/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import './userProfile.css';
import { UserApartmentsContainer, UserDetails } from './components';
import { Container, Grid } from '@mui/material';
import { api } from '@/api';
import { useAppSelector } from '@/hooks';
import { selectUser } from '@/stores/user';
import {
  UserInterestedApartmentsContainer,
  UserRentingApartmentsContainer,
} from './components/userApartments';
import { IMatch, IMatchMap } from '@/models/match.model';

export const UserPage: React.FC = () => {
  const [matchesMap, setMatchesMap] = useState<IMatchMap>({});

  const userData = useAppSelector(selectUser);

  const fetchMatchData = useCallback(async (): Promise<void> => {
    if (!userData.userId) return;

    try {
      const res: IMatch[] = await api.match.getMatchingListByUser(
        userData.userId,
      );

      const matchesFromBE: IMatchMap = {};

      res.forEach((match) => {
        const apartmentId: string = match.apartment._id;
        const prevVal: IMatch[] = matchesFromBE[apartmentId];
        matchesFromBE[apartmentId] = prevVal ? [...prevVal, match] : [match];
      });

      setMatchesMap(matchesFromBE);
    } catch (error) {
      console.error('Error fetching tenant data for lease form', error);
    }
  }, [userData.userId]);

  useEffect(() => {
    fetchMatchData();
  }, [fetchMatchData]);

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
          <UserApartmentsContainer
            matchesMap={matchesMap}
            refreshData={fetchMatchData}
          />
        </Grid>
        <Grid item xs={1}>
          <UserRentingApartmentsContainer
            matchesMap={matchesMap}
            userId={userData.userId}
          />
        </Grid>
        <Grid item xs={1}>
          <UserInterestedApartmentsContainer
            matchesMap={matchesMap}
            userId={userData.userId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
