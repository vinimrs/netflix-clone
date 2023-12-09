import React from 'react';
import FirstHeader from '../app/components/FirstHeader';
import * as S from '../styles/GlobalComponents';
import Layout from 'src/components/Layout';
import Register from 'src/components/Register';

const RegisterPage: React.FC = () => {
	return (
		<Layout title="Netflix - Register Account">
			<S.CustomBackground src="/netflix-library.jpg">
				<FirstHeader />
				<Register />
			</S.CustomBackground>
		</Layout>
	);
};

export default RegisterPage;
