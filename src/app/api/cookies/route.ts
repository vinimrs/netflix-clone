import { cookies } from 'next/headers';

export async function POST(request: Request) {
	console.log('post cookies');
	// guarda os tokens em cookies
	const body = JSON.parse(await request.text());
	const { accessToken, refreshToken } = body;

	cookies().set('netflix.acc', accessToken, {
		path: '/',
		sameSite: 'lax', // csrf
		httpOnly: true, // csrf
		maxAge: 30 * 24 * 60 * 60,
	});

	cookies().set('netflix.ref', refreshToken, {
		path: '/',
		sameSite: 'lax', // csrf
		httpOnly: true, // csrf
		maxAge: 30 * 24 * 60 * 60,
	});

	return Response.json(
		{ accessToken, refreshToken },
		{
			status: 200,
		},
	);
}

export async function GET(request: Request) {
	console.log('get cookies');
	// retorna os tokens em cookies
	const accessToken = cookies().get('netflix.acc')?.value;
	const refreshToken = cookies().get('netflix.ref')?.value;

	console.log('get cookies', accessToken, refreshToken);
	return Response.json(
		{ accessToken, refreshToken },
		{
			status: 200,
		},
	);
}

export async function DELETE(request: Request) {
	// remove os tokens em cookies
	cookies().delete('netflix.acc');
	cookies().delete('netflix.ref');

	return Response.json(
		{ message: 'success' },
		{
			status: 200,
		},
	);
}

