import { IProfile, IUser } from '@types';
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		id: string;
		user: IUser;
		verifiedEmail: boolean;
		profiles: IProfile[];
		tokens: {
			accessToken: string;
			refreshToken: string;
		};
		error?: string;
	}
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		user: IUser;
		verifiedEmail: boolean;
		profiles: IProfile[];
		tokens: {
			accessToken: string;
			refreshToken: string;
		};
	}
}

