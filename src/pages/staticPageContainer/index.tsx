import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { AuthProvider } from '@@/authProvider';

export const StaticPageContainer: FC = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
};
