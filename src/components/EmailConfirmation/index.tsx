import Link from 'next/link';
import React from 'react';
import FirstHeader from '../../app/components/FirstHeader';

import * as S from './styles';

const EmailConfirmation: React.FC = () => {
	return (
		<S.CustomBackground>
			<FirstHeader />
			<S.EmailContainer>
				<h1>Conta Criada!</h1>
				<h2>
					Confirme em seu e-mail para completar o cadastro e faça seu login
					normalmente!
				</h2>
				<Link href="/login">
					<a>Voltar para o login</a>
				</Link>
			</S.EmailContainer>
		</S.CustomBackground>
	);
};

export default EmailConfirmation;
