import { AppProps } from 'next/app';

import GlobalStyle from '../styles/global';

import { createTheme, ThemeProvider } from '@mui/material';
import { FilmsProvider, UsuarioProvider, WindowDimsProvider } from '@contexts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E50914',
    },
    secondary: {
      light: '#00f',
      main: '#f5f5f5',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    warning: {
      main: '#E50930',
    },
  },
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <UsuarioProvider>
        <FilmsProvider>
          <WindowDimsProvider>
            <Component {...pageProps} />
            <GlobalStyle />
          </WindowDimsProvider>
        </FilmsProvider>
      </UsuarioProvider>
    </ThemeProvider>
  );
};

export default MyApp;
