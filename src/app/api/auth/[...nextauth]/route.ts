import { authService } from '@services';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
	const res = await authService.refresh(token.accessToken, token.refreshToken);
	console.log('refreshed');

	return {
		...token,
		tokens: {
			refreshToken: res.refresh_token,
			accessToken: res.access,
		},
	};
}

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Username',
					type: 'text',
					placeholder: 'jsmith',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;
				const { email, password } = credentials;
				console.log('tentando login');
				const res = await authService.login({ email, password });

				console.log(res);
				if (res) {
					const session = await authService.getSession(res.access);
					session.profiles.forEach(prof => {
						if (prof.image?.data) prof.image.data = undefined; // nao conseguimos guardar tudo pelo limite de tamanho
					});
					console.log(session, session.profiles[0].image?.data);
					return {
						...session,
						tokens: {
							refreshToken: res.refresh_token,
							accessToken: res.access,
						},
					};
				}

				return null;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) return { ...token, ...user };

			try {
				console.log('tentando', token.tokens.accessToken);
				await authService.getSession(token.tokens.accessToken);
				console.log('deu bom');
				return token;
			} catch (e) {
				console.log(e);
				return await refreshToken(token);
			}
		},

		async session({ session, token }) {
			console.log({ session });
			session.user = token.user;
			session.tokens = token.tokens;
			session.profiles = token.profiles !== undefined ? token.profiles : [];
			session.id = token.id;
			session.verifiedEmail = token.verifiedEmail;

			return session;
		},
	},

	pages: {
		signIn: '/login',
	},

	secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };

