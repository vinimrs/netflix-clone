import { Children } from '@types';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Netflix',
	description: 'Netflix',
};

const Layout: React.FC<Children> = ({ children }) => {
	return children;
};

export default Layout;
