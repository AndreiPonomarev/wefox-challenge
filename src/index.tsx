import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';

import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
