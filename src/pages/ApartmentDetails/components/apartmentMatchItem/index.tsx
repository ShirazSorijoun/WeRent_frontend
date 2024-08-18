import { api } from '@/api';
import { IMatch } from '@/types/types';
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
import { LeaseAgreementFormDialog } from '@@/CreateLeaseAgreement';

interface IProps {
  match: IMatch;
  fetchMatchingList: () => void;
}
export const ApartmentMatchItem: React.FC<IProps> = ({
  match,
  fetchMatchingList,
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [leaseDialogOpen, setLeaseDialogOpen] = useState<boolean>(false);

  const openLeaseDialog = (): void => {
    setLeaseDialogOpen(true);
  };

  const closeLeaseDialog = (): void => {
    setLeaseDialogOpen(false);
  };

  const acceptMatch = useCallback(
    async (status: boolean) => {
      setSubmitting(true);

      await api.match.acceptMatch(match._id, status);
      await fetchMatchingList();

      setSubmitting(false);
    },
    [fetchMatchingList, match._id],
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
          <>
            <Button onClick={openLeaseDialog}>צור חוזה</Button>
            <LeaseAgreementFormDialog
              isOpen={leaseDialogOpen}
              handleCancel={closeLeaseDialog}
              completeSave={() => {
                closeLeaseDialog();
              }}
            />
          </>
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
  }, [acceptMatch, match.accepted, submitting]);

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
