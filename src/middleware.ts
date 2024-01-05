import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authService } from './services/auth/authService';

const userRoutes = [
	'/browse',
	'/email-confirmation',
	'/logout',
	'/manage-profile',
	'/select-profile',
];

const publicRoutes = ['/login', '/', '/register'];

export async function middleware(request: NextRequest) {
	const accessCookie = request.cookies.get('netflix.acc');
	const refreshCookie = request.cookies.get('netflix.ref');

	const accessToken = accessCookie?.value;
	const refreshToken = refreshCookie?.value;

	let validCookie = false;
	const newTokens = {
		accessToken: '',
		refreshToken: '',
	};

	if (accessToken !== undefined && refreshToken !== undefined) {
		// testa validade do cookie
		// se for invalido, redireciona para login
		// se for valido, redireciona para browse
		const { data, isLogged } = await authService.validateKey(accessToken);
		console.log('middleware -> data', data, isLogged);
		if (!isLogged) {
			// tenta renovar o token
			const response = await authService.validateKeyWithRefresh(
				accessToken,
				refreshToken,
			);
			if (response.message === 'success') {
				newTokens.accessToken = response.data.accessToken;
				newTokens.refreshToken = response.data.refreshToken;
				validCookie = true;
			} else {
				validCookie = false;
			}
		} else {
			validCookie = true;
		}
	}

	// Getting the request path
	const path = request.nextUrl.pathname;

	// Check if the request path is a user route
	const isUserRoute = userRoutes.includes(path);

	// Check if the request path is a public route
	const isPublicRoute = publicRoutes.includes(path);

	// Check if the user is logged in
	const isLoggedIn = validCookie && !!accessToken;
	console.log('middleware -> isLoggedIn', isLoggedIn);

	// If the request path is a user route and the user isnt logged in, redirect to the login page
	if (isUserRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	let response: NextResponse = NextResponse.next();

	// If the request path is a public page and the user is logged in, redirect to the browse page
	if (isPublicRoute && isLoggedIn) {
		response = NextResponse.redirect(new URL('/browse', request.url));
	}

	// se renovou
	if (newTokens.accessToken !== '' && newTokens.refreshToken !== '') {
		response.cookies.set('netflix.acc', newTokens.accessToken, {
			path: '/',
			sameSite: 'lax', // csrf
			httpOnly: true, // csrf
			maxAge: 30 * 24 * 60 * 60,
		});
		response.cookies.set('netflix.ref', newTokens.refreshToken, {
			path: '/',
			sameSite: 'lax', // csrf
			httpOnly: true, // csrf
			maxAge: 30 * 24 * 60 * 60,
		});
	}

	return response;
}

export const config = {
	matcher: [
		'/browse/:path*',
		'/email-confirmation/:path*',
		'/logout/:path*',
		'/manage-profile/:path*',
		'/select-profile/:path*',
		'/login/:path*',
		'/',
	],
};

