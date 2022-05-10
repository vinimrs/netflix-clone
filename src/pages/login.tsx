import React from 'react';
import Layout from 'src/components/Layout';
import Login from 'src/components/Login';

const LoginPage: React.FC = () => {
	return (
		<Layout title="Netflix - Login">
			<Login />
		</Layout>
	);
};

export default LoginPage;
