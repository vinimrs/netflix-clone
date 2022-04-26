import { AppProps } from 'next/app';

import GlobalStyle from '../styles/global';
// import { ThemeProvider } from 'styled-components';
// import theme from '../styles/theme';

import { createTheme, ThemeProvider } from '@mui/material';
import { FilmsProvider } from '../common/context/Films';
import { UsuarioProvider } from '../common/context/Usuario';

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#E50914',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#00f',
            main: '#f5f5f5',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Usado pelas funções abaixo para mudança de uma cor de luminância por aproximadamente
        // dois índices dentro de sua paleta tonal.
        // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
        tonalOffset: 0.2,
        warning: {
            main: '#E50930',
        },
        // transparent: '#0000',
    },
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <UsuarioProvider>
                <FilmsProvider>
                    <Component {...pageProps} />
                    <GlobalStyle />
                </FilmsProvider>
            </UsuarioProvider>
        </ThemeProvider>
    );
};

export default MyApp;
