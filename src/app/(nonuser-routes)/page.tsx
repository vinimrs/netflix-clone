import { Metadata } from 'next';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
	title: 'Netflix Brasil - Assista a séries e filmes online',
	description:
		'Assista a Netflix onde quiser. Assista no seu celular, tablet, Smart TV ou notebook sem pagar a mais por isso.',
};

const DashboardPage = () => {
	return <Dashboard />;
};

export default DashboardPage;

