import React from 'react';
import * as S from './styles';

import { HttpClient } from 'src/infra/HttpClient/HttpClient';
import FormProfile from './FormProfile';
import FirstHeader from 'src/components/FirstHeader';

const ManageProfileContainer = async () => {
	const res = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/image`, {
		method: 'GET',
		cache: 'force-cache', // getStaticProps
	});

	return (
		<S.ManageProfileContainer>
			<FirstHeader />
			<FormProfile images={res.body} />
		</S.ManageProfileContainer>
	);
};

export default ManageProfileContainer;

