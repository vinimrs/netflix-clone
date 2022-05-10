import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

const Error404Div = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	@media (max-width: 768px) {
		h1 {
			font-size: 22px;
		}
	}
`;

export default function Custom404() {
	return (
		<Error404Div>
			<Head>
				<title>404 - Página não encontrada</title>
			</Head>
			<Image src="netflix-logo.svg" width="300px" height="150px" />
			<h1>Oops - Página não encontrada</h1>
		</Error404Div>
	);
}
