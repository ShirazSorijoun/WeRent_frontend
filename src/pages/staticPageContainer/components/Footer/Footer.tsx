import React from 'react';
import './Footer.css';
import { Box, Typography, Link, Stack } from '@mui/material';
//import "./pages/LandingPage";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        padding: '20px 0',
        color: 'white',
        textAlign: 'center',
        direction: 'rtl',
      }}
    >
      <Stack direction="row" justifyContent="space-around">
        <Stack direction="row" spacing={2} useFlexGap>
          <Typography variant="h4" sx={{ color: '#fff' }}>
            קצת עלינו:
          </Typography>
          <Typography sx={{ color: '#fff' }}>
            אנחנו כאן כדי לעזור לך למצוא את בית החלומות שלך בעזרת מצוינות אליה
            מלווה בטכנולוגיה והתאמה אישית לכל עסקת נדלן{' '}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} useFlexGap>
          <Typography variant="h4" sx={{ color: '#fff' }}>
            צור קשר:
          </Typography>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <li>
              <Link sx={{ color: '#fff', textDecoration: 'none' }}>
                אימייל : WeRent@gmail.com
              </Link>
            </li>
            <li>
              <Link sx={{ color: '#fff', textDecoration: 'none' }}>
                טלפון: : 123-456-7890
              </Link>
            </li>
          </ul>
        </Stack>
      </Stack>
      <Box
        sx={{
          backgroundColor: '#111',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
        }}
      >
        &copy; 2024 WeRent. All rights reserved
      </Box>
    </Box>
  );
};
