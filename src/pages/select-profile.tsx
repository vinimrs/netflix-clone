import React from 'react';
import { withSession } from '../services/auth/session';
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

export const getServerSideProps = withSession(async ctx => {
	return {
		props: {
			session: ctx.req.session,
		},
	};
});

export default SelectProfilePage;
