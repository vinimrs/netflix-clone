'use client';
import Link from 'next/link';
import React from 'react';
import * as S from './styles';
import { useSession } from '@hooks';

const Dashboard: React.FC = () => {
	const { session } = useSession();
	console.log(`session: ${session?.user?.username}`);

	return (
		<div>
			<h1>
				Os maiores sucessos do Brasil e do mundo. As melhores histórias. Tudo na
				Netflix.
			</h1>
			<p>Assista onde quiser. Cancele quando quiser.</p>
			<div>
				<p>
					Quer assistir? Informe seu email para criar ou reiniciar sua
					assinatura.
				</p>
				<form>
					<input type="email" placeholder="Email" />
					<button type="submit">Vamos lá</button>
				</form>
			</div>

			{/* <Link href={'/signup'}>Sign Up</Link> */}
		</div>
	);
};

export default Dashboard;

