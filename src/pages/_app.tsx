import { AppProps } from 'next/app';
import GlobalStyle from '../styles/global';
import { createTheme, ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import NextProgress from 'nextjs-progressbar';
import Head from 'next/head';

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
			<Head>
				<title>Netflix</title>
			</Head>
			<RecoilRoot>
				<NextProgress
					color={'linear-gradient(90deg, #ff202c 30%, #E50914 100%)'}
					height={3.5}
				/>
				<Component {...pageProps} />
				<GlobalStyle />
			</RecoilRoot>
		</ThemeProvider>
	);
};

export default MyApp;
