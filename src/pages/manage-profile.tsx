import React, { useEffect, useState } from 'react';
import { IImageData, ISession } from '@types';
import { useRouter } from 'next/router';
import { withSession } from '../services/auth/session';
import { HttpClient } from '../infra/HttpClient/HttpClient';

import ManageProfileContainer from '../components/ManageProfileContainer';
import Layout from 'src/components/Layout';

interface CreateManageProfilesProps {
	session: ISession;
	images: IImageData[];
}

const ManageProfilesPage: React.FC<CreateManageProfilesProps> = ({
	session,
	images,
}) => {
	const [editProfile, setEditProfile] = useState('');

	const router = useRouter();

	useEffect(() => {
		if (router.query.create) setEditProfile('');
		if (typeof router.query.edit === 'string') {
			setEditProfile(router.query.edit);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout title="Netflix - Manage Profile">
			<ManageProfileContainer
				session={session}
				images={images}
				editProfile={editProfile}
			/>
		</Layout>
	);
};

export const getServerSideProps = withSession(async ctx => {
	const res = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/image`, {
		method: 'GET',
	});

	return {
		props: {
			images: res.body,
			session: ctx.req.session,
		},
	};
});

export default ManageProfilesPage;
