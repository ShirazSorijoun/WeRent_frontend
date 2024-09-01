import { api } from '@/api';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { LoadingButton } from '@mui/lab';
import { useGetImageUrlFromName } from '@/hooks';
import { MatchLeaseDisplay } from '../matchLeaseDisplay';
import { IMatch } from '@/models/match.model';

interface IProps {
  match: IMatch;
  refreshData?: () => void;
}
export const ApartmentMatchItem: React.FC<IProps> = ({
  match,
  refreshData,
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const acceptMatch = useCallback(
    async (status: boolean) => {
      setSubmitting(true);

      await api.match.acceptMatch(match._id, status);
      if (refreshData) await refreshData();

      setSubmitting(false);
    },
    [refreshData, match._id],
  );

  const userImage = useGetImageUrlFromName(match.user.profile_image);

  const userName = useMemo(
    () => `${match.user?.firstName ?? ''} ${match.user?.lastName ?? ''}`,
    [match.user],
  );

  const statusDisplay = useMemo(() => {
    switch (match.accepted) {
      case true:
        return (
          <MatchLeaseDisplay
            tenantId={match.user._id!}
            apartmentId={match.apartment._id}
            refreshData={refreshData}
          />
        );
      case false:
        return <Typography variant="body1">סירבת להמשיך את התהליך</Typography>;
      default:
        return (
          <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
            <Button
              variant="contained"
              color="error"
              onClick={() => acceptMatch(false)}
            >
              סרב
            </Button>
            <LoadingButton
              onClick={() => acceptMatch(true)}
              variant="contained"
              color="success"
              loading={submitting}
            >
              המשך
            </LoadingButton>
          </Stack>
        );
    }
  }, [
    acceptMatch,
    match.accepted,
    match.apartment,
    match.user._id,
    submitting,
  ]);

  return (
    <Card key={match._id} raised sx={{ padding: '16px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Avatar
            sx={{
              marginLeft: '16px',
              backgroundColor: '#edf6f7',
            }}
          >
            {userImage ? (
              <img
                src={userImage}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <PersonIcon sx={{ color: '#018489' }} />
            )}
          </Avatar>
          <Typography variant="body1" color="textSecondary">
            {userName}
          </Typography>
        </Stack>

        <IconButton>
          <EmailIcon />
          {match.user.email}
        </IconButton>

        {statusDisplay}
      </Stack>
    </Card>
  );
};
