import React from 'react';
import { useGetImageUrlFromName } from '@/hooks';
import {
  CardContent,
  CardHeader,
  Card,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import { StoreUser, styleType } from '@/models';
import { UserEditButton } from '../editUser';
import { ChangePassword } from '../changePassword';

const style: styleType = {
  propertyTitle: {
    fontWeight: 'bold',
    paddingLeft: '5px',
  },
  propertyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
};

interface IProps {
  userData: StoreUser;
}

export const UserDetails: React.FC<IProps> = ({ userData }) => {
  const profileImage = useGetImageUrlFromName(userData?.profile_image);

  return (
    <Card
      sx={{
        direction: 'rtl',
        height: 'max-content',
        border: 'solid 1px rgba(0, 0, 0, 0.175)',
        width: '550px',
      }}
      raised
    >
      <CardHeader
        sx={{
          backgroundColor: '#f8f8f8',
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.175)',
        }}
        title="הפרטים שלי"
        action={
          <>
            {!userData.isWithGoogle && <ChangePassword />}
            <UserEditButton userData={userData} />
          </>
        }
      />
      <CardContent>
        <Stack direction="row" spacing={4} useFlexGap>
          <Grid
            container
            direction="column"
            alignContent="flex-start"
            justifyContent="center"
          >
            <Grid item sx={style.propertyContainer}>
              <Typography variant="h6" sx={style.propertyTitle}>
                שם:
              </Typography>
              <Typography>
                {`${userData.firstName} ${userData.lastName}`}
              </Typography>
            </Grid>
            <Grid item sx={style.propertyContainer}>
              <Typography variant="h6" sx={style.propertyTitle}>
                כתובת:
              </Typography>
              <Typography>
                {`${userData.cityAddress} ${userData.streetAddress}`}
              </Typography>
            </Grid>
            <Grid item sx={style.propertyContainer}>
              <Typography variant="h6" sx={style.propertyTitle}>
                טלפון:
              </Typography>
              <Typography>{userData.phoneNumber}</Typography>
            </Grid>
            <Grid item sx={style.propertyContainer}>
              <Typography variant="h6" sx={style.propertyTitle}>
                מייל:
              </Typography>
              <Typography>{userData.email}</Typography>
            </Grid>
          </Grid>
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: '200px',
              height: '200px',
              alignItems: 'center',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
