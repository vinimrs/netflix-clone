import { NextPageContext } from 'next';
import nookies from 'nookies';

const ACCESS_TOKEN_KEY = 'netflix.acc';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
	save(accessToken: string, ctx = null): void {
		nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
			maxAge: ONE_YEAR,
			path: '/',
		});
	},
	get(ctx: NextPageContext) {
		const cookies = nookies.get(ctx);
		return cookies[ACCESS_TOKEN_KEY] || '';
	},
	delete(ctx = null): void {
		nookies.destroy(ctx, ACCESS_TOKEN_KEY);
	},
};
