import Head from 'next/head';
import React from 'react';
import AlertComponent from './Alert';

// import { Container } from './styles';

const Layout: React.FC<{ title: string; children?: React.ReactNode }> = ({
	title,
	children,
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			{children}
			<AlertComponent />
		</>
	);
};

export default Layout;
