import { Metadata } from 'next';
import React, { useEffect } from 'react';
import Redirection from 'src/components/Redirection';

export const metadata: Metadata = {
	title: 'Logout - Netflix',
	description: 'Logout from Netflix.',
};

const Logout: React.FC = () => {
	return <Redirection />;
};

export default Logout;

