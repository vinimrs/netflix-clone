import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './GlobalStyle';
import AppRoutes from './router';

ReactDOM.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
          <GlobalStyle />
        <AppRoutes />

      </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);