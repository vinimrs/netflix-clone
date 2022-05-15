import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import { tokenService } from '../services/auth/tokenService';
import Layout from 'src/components/Layout';
import Redirection from 'src/components/Redirection';

const LogoutPage: React.FC = () => {
	const router = useRouter();
	// Pàra rodar somente no client, pois não daria para redirecionar no servidor
	useEffect(() => {
		try {
			HttpClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh`, {
				method: 'DELETE',
			}).then(() => {
				tokenService.delete();
				router.push('/login');
			});
		} catch (error) {
			alert(error.message);
		}
	}, [router]);

	return (
		<Layout title="Netflix - Logout">
			<Redirection />
		</Layout>
	);
};

export default LogoutPage;
