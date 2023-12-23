'use client';
import React from 'react';

const Dashboard = () => {
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

