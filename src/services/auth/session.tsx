import { useRouter } from 'next/router';
import React from 'react';
import Loading from 'src/components/Loading';
import { authService } from './authService';
import { useSession } from '@hooks';

export function withSession(funcao: (ctx) => any) {
	return async ctx => {
		try {
			const session = await authService.getSession(ctx);
			const modifiedCtx = {
				...ctx,
				req: {
					...ctx.req,
					session,
				},
			};
			return funcao(modifiedCtx);
		} catch (error) {
			console.log(error);
			return {
				redirect: {
					permanent: false,
					destination: '/login',
				},
			};
		}
	};
}

// Static pages
export function useStaticSession() {
	const { session, setSession } = useSession();
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		authService
			.getSession()
			.then(session => {
				setSession(session);
			})
			.catch(err => setError(err))
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return {
		data: {
			session,
		},
		error,
		loading,
	};
}

// Componente de Ordem Superior Static-pages
export function withSessionHOC(Component: React.ComponentType) {
	return function Wrapper(props) {
		const router = useRouter();
		const session = useStaticSession();

		if (session.loading) return <Loading />;

		if (!session.loading && session.error) {
			router.push('/login');
		}

		const modifiedProps = {
			...props,
			session: session.data.session,
		};
		return <Component {...modifiedProps} />;
	};
}
