import React from 'react';
import { withSessionHOC } from '../services/auth/session';
import { ISession } from '@types';
import FirstHeader from '../components/FirstHeader';
import Layout from 'src/components/Layout';
import SelectProfile from 'src/components/SelectProfile';

const SelectProfilePage: React.FC<{
	session?: ISession;
}> = ({ session }) => {
	return (
		<Layout title="Netflix - Select Profiles">
			<FirstHeader />
			<SelectProfile session={session} />
		</Layout>
	);
};

export default withSessionHOC(SelectProfilePage);
