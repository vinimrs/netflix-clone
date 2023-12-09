'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
	const { data: session } = useSession();
	console.log(`session: ${session}`);

	return (
		<>
			<h1>Assine a Netflix</h1>
			<p>
				Temos os melhores títulos do mercado disponíveis a qualquer momento para
				você.
			</p>
			<Link href={'/login'}>Sign In</Link>
			{/* <Link href={'/signup'}>Sign Up</Link> */}
		</>
	);
};

export default Dashboard;

