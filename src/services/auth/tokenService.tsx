import { cookies } from 'next/headers';
import { HttpClient } from 'src/infra/HttpClient/HttpClient';

const ACCESS_TOKEN_KEY = 'netflix.acc';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

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
};
