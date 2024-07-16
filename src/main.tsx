import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { defaultTheme } from './utils/theme';
import { ToastContainer } from 'react-toastify';
import { GOOGLE_API_KEY } from './api';
import { Provider } from 'react-redux';
import { store } from './stores';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_API_KEY}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss={false}
              draggable
              theme="colored"
            />
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
