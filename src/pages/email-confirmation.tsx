import React from 'react';
import Layout from 'src/components/Layout';
import EmailConfirmation from 'src/components/EmailConfirmation';

const EmailConfirmationPage: React.FC = () => {
	return (
		<Layout title="Netflix - Confirmação de Email">
			<EmailConfirmation />
		</Layout>
	);
};

export default EmailConfirmationPage;
