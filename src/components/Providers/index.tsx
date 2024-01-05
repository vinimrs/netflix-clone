'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import { Children } from '@types';
import React from 'react';
import GlobalStyle from '../../app/global';
import AlertComponent from '../Alert';
import StyledComponentsRegistry from './registry';
import WebVitals from '../WebVitals';
import { Provider } from 'react-redux';
import store from 'src/store';

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
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<StyledComponentsRegistry>
					{children}
					<WebVitals />
					<AlertComponent />
					<GlobalStyle />
				</StyledComponentsRegistry>
			</ThemeProvider>
		</Provider>
	);
};

export default Providers;

