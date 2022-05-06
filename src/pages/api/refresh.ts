import nookies from 'nookies';
import { HttpClient } from '../../infra/HttpClient/HttpClient';
import { tokenService } from '../../services/auth/tokenService';

const REFRES_TOKEN_NAME = 'REFRESH_TOKEN_NAME';

const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res };

    // guardando em um httpCookie - Mais seguro que cookie

    nookies.set(ctx, REFRES_TOKEN_NAME, req.body.refresh_token, {
      httpOnly: true,
      sameSite: 'lax', // Somente do mesmo domínio terá acesso
      path: '/',
    });

    res.json({
      data: {
        message: 'Stored with success!',
      },
    });
  },
  async displayCookies(req, res) {
    const ctx = { req, res };

    res.json({
      data: {
        cookies: nookies.get(ctx),
      },
    });
  },
  async regenerateTokens(req, res) {
    const ctx = { req, res };
    const cookies = nookies.get(ctx);
    // Ajuste pois no servidor não temos acesso aos cookies
    const refresh_token = cookies[REFRES_TOKEN_NAME] || req.body.refresh_token;

    const refreshResponse = await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refresh`,
      {
        method: 'POST',
        body: {
          refresh_token,
        },
      }
    );
    if (refreshResponse.ok) {
      nookies.set(ctx, REFRES_TOKEN_NAME, refreshResponse.body.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      });
      const newAccessToken = refreshResponse.headers.get('Authorization');
      tokenService.save(newAccessToken, ctx);

      res.json({
        data: {
          refresh_token: refreshResponse.body.refresh_token,
          access_token: newAccessToken,
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'Não autorizado',
      });
    }
  },
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.regenerateTokens,
  PUT: controllers.regenerateTokens,
  DELETE: (req, res) => {
    const ctx = { req, res };
    nookies.destroy(ctx, REFRES_TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    res.json({
      data: {
        message: 'Deleted with success!',
      },
    });
  },
};

export default function handler(req: Request, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({
    status: 404,
    message: 'Not Found',
  });
}
