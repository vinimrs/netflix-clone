'use client';
import React from 'react';
import * as S from './styles';

const Dashboard: React.FC = () => {
	return (
		<S.Container>
			<S.Title>Filmes, séries e muito mais, sem limites</S.Title>
			<S.Subtitle>Assista onde quiser. Cancele quando quiser.</S.Subtitle>
			<div>
				<S.Text>
					Quer assistir? Informe seu email para criar ou reiniciar sua
					assinatura.
				</S.Text>
				<S.Form>
					<S.Input type="email" placeholder="Email" />
					<S.Button type="submit">Vamos lá</S.Button>
				</S.Form>
			</div>

			{/* <Link href={'/signup'}>Sign Up</Link> */}
		</S.Container>
	);
};

export default Dashboard;

