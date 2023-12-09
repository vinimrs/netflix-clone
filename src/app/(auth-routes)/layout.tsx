import { Children } from '@types';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const NonUserLayout = async ({
	children,
}: {
	children: React.ReactNode;
}): Promise<React.ReactNode> => {
	const session = await getServerSession(authOptions);
	console.log('nonuserlayout', session);

	if (session) {
		redirect('/dashboard');
	}

	return <>{children}</>;
};

export default NonUserLayout;

