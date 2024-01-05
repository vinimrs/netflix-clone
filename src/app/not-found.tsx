'use client';
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

const Custom404 = () => {
	return (
		<Error404Div>
			<Image
				alt="Logo da Netflix"
				src="/netflix-logo.svg"
				width="300"
				height="150"
			/>
			<h1>Oops - Página não encontrada</h1>
		</Error404Div>
	);
};

export default Custom404;

