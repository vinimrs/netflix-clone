// Arquitetura Hexagonal
import nookies from 'nookies';
import { tokenService } from '../../services/auth/tokenService';

// Ports & Adapters
export async function HttpClient(fethUrl: string, fetchOptions) {
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
                body: await respostaDoServidor.json(),
                headers: respostaDoServidor.headers,
            };
        })

        .then(async res => {
            if (!fetchOptions.refresh) return res;
            if (res.status !== 401) return res;

            const isServer = Boolean(fetchOptions?.ctx);
            const currentRefreshToken =
                fetchOptions?.ctx?.req?.cookies['REFRESH_TOKEN_NAME'];

            // console.log('Atualizando tokens');

            /*
            -Sempre use try catch para capturar os erros desconhecidos. 
            -Desconfia que algum código não está rodando misteriosamente, coloque num trycatch
            */
            try {
                // Tentar atualizar os tokens
                const refreshResponse = await HttpClient(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh`,
                    {
                        method: isServer ? 'PUT' : 'GET',
                        body: isServer
                            ? { refresh_token: currentRefreshToken }
                            : undefined,
                    }
                );

                const newAccessToken = refreshResponse.body.data.access_token;
                const newRefreshToken = refreshResponse.body.data.refresh_token;

                // guardar os tokens
                if (isServer) {
                    // com ssr
                    nookies.set(
                        fetchOptions.ctx,
                        'REFRESH_TOKEN_NAME',
                        newRefreshToken,
                        {
                            httpOnly: true,
                            sameSite: 'lax',
                            path: '/',
                        }
                    );
                }

                tokenService.save(newAccessToken); // com static

                // tentar rodar o request anterior
                const retryResponse = await HttpClient(fethUrl, {
                    ...fetchOptions,
                    refresh: false,
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                return retryResponse;
            } catch (error) {
                console.log(error.message);
                return res;
            }
        });
}
