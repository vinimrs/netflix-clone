import { authService } from './authService';

export function withSession(funcao: Function) {
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
            return {
                redirect: {
                    permanent: false,
                    destination: '/login/',
                },
            };
        }
    };
}
