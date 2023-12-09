import { Children } from '@types';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

// import { Container } from './styles';

const UserLayout = async ({
	children,
}: {
	children: React.ReactNode;
}): Promise<React.ReactNode> => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	return <>{children}</>;
};

export default UserLayout;

