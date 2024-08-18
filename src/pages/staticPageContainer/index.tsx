import { FC, useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { useAppDispatch } from '@/hooks/store';
import { ACCESS_TOKEN, api } from '@/api/api';
import { logout, userLogin } from '@/stores/user';
import { Box, Stack } from '@mui/material';

export const StaticPageContainer: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const startEffect = async () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        const userId = localStorage.getItem('userId');
        if (
          !!localStorage.getItem('accessToken') &&
          !!localStorage.getItem('refreshToken') &&
          !!userId
        ) {
          const accessToken = localStorage.getItem(ACCESS_TOKEN);
          const isTokenValid = accessToken
            ? await api.auth.checkToken(accessToken)
            : false;
          if (isTokenValid) {
            await dispatch(userLogin(userId));
          } else {
            dispatch(logout());
          }
        }
      } else {
        redirect('/login');
      }
    };

    startEffect();
  }, [dispatch]);

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Box flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
};
