import React, { useEffect } from 'react';
import { withSession } from '../services/auth/session';
import { ISession } from '@types';
import FirstHeader from '../components/FirstHeader';
import Layout from 'src/components/Layout';
import { useSession } from '@hooks';
import SelectProfile from 'src/components/SelectProfile';

const SelectProfilePage: React.FC<{
	session?: ISession;
}> = ({ session }) => {
	const { setSession } = useSession();

	useEffect(() => {
		setSession(session);
	}, [session, setSession]);

	return (
		<Layout title="Netflix - Select Profiles">
			<FirstHeader />
			<SelectProfile />
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
