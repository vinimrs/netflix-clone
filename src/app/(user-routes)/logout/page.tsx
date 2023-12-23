import { Metadata } from 'next';
import React from 'react';
import Redirection from 'src/components/Redirection';

export const metadata: Metadata = {
	title: 'Logout - Netflix',
	description: 'Logout from Netflix.',
};

const Logout = () => {
	return <Redirection />;
};

export default Logout;

