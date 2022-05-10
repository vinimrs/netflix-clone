import { useRouter } from 'next/router';
import React from 'react';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import { tokenService } from '../services/auth/tokenService';
import Layout from 'src/components/Layout';

export default function LogoutPage() {
	const router = useRouter();
	// Pàra rodar somente no client, pois não daria para redirecionar no servidor
	React.useEffect(() => {
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
			<h2>Você será redirecionado em instantes...</h2>
		</Layout>
	);
}
