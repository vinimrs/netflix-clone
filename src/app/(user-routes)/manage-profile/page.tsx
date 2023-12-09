import React from 'react';
import * as S from './styles';

import { HttpClient } from 'src/infra/HttpClient/HttpClient';
import FormProfile from './FormProfile';

const ManageProfileContainer = async () => {
	const res = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/image`, {
		method: 'GET',
		cache: 'force-cache', // getStaticProps
	});

	console.log(`res ${res}`);

	return (
		<S.ManageProfileContainer>
			<FormProfile images={res.body} />
		</S.ManageProfileContainer>
	);
};

export default ManageProfileContainer;
