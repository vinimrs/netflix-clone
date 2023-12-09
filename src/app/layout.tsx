import type { Children } from '@types';
import { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Providers from './components/Providers';

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
	display: 'swap',
});

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Netflix - Browse',
	description: 'Navegue entre os nossos títulos mais aclamados pela crítica.',
};

const Root: React.FC<Children> = ({ children }) => {
	return (
		<html
			lang="pt-br"
			className={`${openSans.variable} ${montserrat.variable}`}
		>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default Root;

