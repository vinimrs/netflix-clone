/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	staticPageGenerationTimeout: 180,
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/t/p/**',
			},
		],
	},
	env: {
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
	distDir: 'dist',
};

module.exports = nextConfig;
