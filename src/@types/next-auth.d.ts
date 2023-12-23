import { IProfile, IUser } from '@types';

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

