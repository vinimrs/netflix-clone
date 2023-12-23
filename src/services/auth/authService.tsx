import { HttpClient } from '../../infra/HttpClient/HttpClient';
import { tokenService } from './tokenService';
import { ISession } from '@types';

/**
 * @4.1 Agora, que já abstraímos e criamos um servico de autenticação que envia a requisição
 * Precisamos guardar os tokens no cliente para usá-los
 * @options
 * LocalStorage - Guarda para "sempre", não muito seguro se o token tiver validade alta, mas nao pode ser acessado no back
 * SessionStorage - Guarda durante uma sessão do navegador, mais seguro, mesmo problema do back
 * Cookies - Mais seguro que localstorage
 * HTTP only Cookie - RECOMENDADO, mais seguro de todos
 */

export const authService = {
	async login({ email, password }) {
		return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
			method: 'POST',
			body: {
				email,
				password,
			},
			refresh: false,
		})
			.then(res => {
				const body = {
					...res.body,
					access: res.headers.get('Authorization'),
				};
				return body;
			})
			.catch(err => {
				console.log(err);
			});
	},
	async getSession(): Promise<ISession> {
		const { accessToken } = await tokenService.getTokens();

		return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/session`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: 'no-store', // getServerSideProps na App route
			refresh: true,
		}).then(response => {
			if (!response.ok) throw new Error('Não autorizado');

			return response.body.data;
		});
	},
	async logout() {
		const { accessToken, refreshToken } = await tokenService.getTokens();

		return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout `, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: {
				refresh_token: refreshToken,
			},
			refresh: false,
		})
			.then(response => {
				if (!response.ok) throw new Error(response.body.message);

				return response.body.data;
			})
			.finally(() => {
				tokenService.removeTokens().then(res => {
					console.log('tokens removidos', res);
				});
			});
	},
	async refresh(): Promise<{ accessToken: string; refreshToken: string }> {
		const { refreshToken } = await tokenService.getTokens();

		return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refresh`, {
			method: 'POST',
			body: {
				refresh_token: refreshToken,
			},
			refresh: false,
		}).then(response => {
			if (!response.ok) throw new Error(response.body.message);

			const body = {
				refreshToken: response.body.refresh_token,
				accessToken: response.headers.get('Authorization'),
			};

			return body;
		});
	},
	async validateKey(accessKey: string): Promise<boolean> {
		try {
			const res: ISession = await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/session`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessKey}`,
					},
					cache: 'no-store', // getServerSideProps na App route
					refresh: false,
				},
			).then(response => {
				if (!response.ok) throw new Error('Não autorizado');

				return response.body.data;
			});
			return true;
		} catch (error) {
			return false;
		}
	},
	async validateKeyWithRefresh(
		accessKey: string,
		refreshKey: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		message: string;
	}> {
		// tentando refresh
		try {
			const res = await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refresh`,
				{
					method: 'POST',
					body: {
						refresh_token: refreshKey,
					},
					refresh: false,
				},
			).then(response => {
				if (!response.ok) throw new Error(response.body.message);

				const body = {
					refreshToken: response.body.refresh_token,
					accessToken: response.headers.get('Authorization'),
				};

				return body;
			});

			tokenService.save(res.accessToken, res.refreshToken);

			const result = {
				accessToken: res.accessToken,
				refreshToken: res.refreshToken,
				message: 'success',
			};

			return result;
		} catch (error) {
			return {
				accessToken: '',
				refreshToken: '',
				message: 'Refresh token inválido!',
			};
		}
	},
};
