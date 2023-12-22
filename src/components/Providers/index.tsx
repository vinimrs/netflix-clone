'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import { Children } from '@types';
import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../../app/global';
import NextNProgress from 'nextjs-progressbar';
import AlertComponent from '../Alert';
import StyledComponentsRegistry from './registry';

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
			<StyledComponentsRegistry>
				<RecoilRoot>
					<NextNProgress
						color={'linear-gradient(90deg, #ff202c 30%, #E50914 100%)'}
						height={3.5}
					/>
					{children}
					<AlertComponent />
					<GlobalStyle />
				</RecoilRoot>
			</StyledComponentsRegistry>
		</ThemeProvider>
	);
};

export default Providers;

