import { ISession } from '@types';
import { HttpClient } from 'src/infra/HttpClient/HttpClient';
import * as jose from 'jose';

export const tokenService = {
	getTokens: async (): Promise<{
		accessToken: string;
		refreshToken: string;
	}> => {
		return await HttpClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookies`, {
			method: 'GET',
		}).then(res => {
			return res.body;
		});
	},

	removeTokens: async (): Promise<{ message: string }> => {
		return await HttpClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookies`, {
			method: 'DELETE',
		}).then(res => {
			return res.body;
		});
	},

	save: async (accessToken: string, refreshToken: string): Promise<any> => {
		return await HttpClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookies`, {
			method: 'POST',
			body: {
				accessToken,
				refreshToken,
			},
		}).then(res => {
			return res.body;
		});
	},
	signSession: async (session: ISession): Promise<string> => {
		const secret = process.env.JWT_SECRET || 'SECRET';
		return await new jose.EncryptJWT({ ...session })
			.setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
			.setIssuedAt()
			.setExpirationTime('7d')
			.encrypt(new TextEncoder().encode(secret));
	},
};
