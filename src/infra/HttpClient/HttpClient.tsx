import { authService, tokenService } from '@services';

// Ports & Adapters
export async function HttpClient(fethUrl: string, fetchOptions: any) {
	return fetch(fethUrl, {
		...fetchOptions,
		headers: {
			'Content-Type': 'application/json',
			...fetchOptions.headers,
		},
		body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
	})
		.then(async respostaDoServidor => {
			return {
				ok: respostaDoServidor.ok,
				status: respostaDoServidor.status,
				body:
					respostaDoServidor.status !== 204
						? await respostaDoServidor.json()
						: {},
				headers: respostaDoServidor.headers,
			};
		})
		.then(async res => {
			if (!fetchOptions.refresh) return res;
			if (res.status !== 401) return res;

			// console.log('Atualizando tokens');

			/*
	        -Sempre use try catch para capturar os erros desconhecidos.
	        -Desconfia que algum código não está rodando misteriosamente, coloque num trycatch
	        */
			try {
				// Tentar atualizar os tokens
				const { accessToken, refreshToken } = await authService.refresh();

				// guardar os tokens
				const newAccessToken = accessToken;
				const newRefreshToken = refreshToken;

				// tentar rodar o request anterior
				const retryResponse = await HttpClient(fethUrl, {
					...fetchOptions,
					refresh: false,
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				});

				tokenService.save(newAccessToken, newRefreshToken);

				// se der erro de novo, desloga
				if (retryResponse.status === 401) {
					await authService.logout();
					return retryResponse;
				}

				// se der erro de novo, retorna o erro
				return retryResponse;
			} catch (error) {
				if (error.message === 'Refresh token inválido!')
					tokenService.removeTokens();
				else await authService.logout();

				return res;
			}
		});
}
