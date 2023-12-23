import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

	return NextResponse.json(
		{ accessToken, refreshToken },
		{
			status: 200,
		},
	);
}

export async function GET() {
	// retorna os tokens em cookies
	const accessToken = cookies().get('netflix.acc')?.value;
	const refreshToken = cookies().get('netflix.ref')?.value;

	return NextResponse.json(
		{ accessToken, refreshToken },
		{
			status: 200,
		},
	);
}

export async function DELETE() {
	// remove os tokens em cookies
	cookies().delete('netflix.acc');
	cookies().delete('netflix.ref');

	return NextResponse.json(
		{ message: 'success' },
		{
			status: 200,
		},
	);
}

