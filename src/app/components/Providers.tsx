'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import { Children } from '@types';
import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../global';
import NextNProgress from 'nextjs-progressbar';
import AlertComponent from './Alert';
import { SessionProvider } from 'next-auth/react';

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

const Providers: React.FC<Children> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<SessionProvider>
				<RecoilRoot>
					<NextNProgress
						color={'linear-gradient(90deg, #ff202c 30%, #E50914 100%)'}
						height={3.5}
					/>
					{children}
					<AlertComponent />
					<GlobalStyle />
				</RecoilRoot>
			</SessionProvider>
		</ThemeProvider>
	);
};

export default Providers;

