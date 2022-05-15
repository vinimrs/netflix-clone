import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: absolute;
	color: var(--white);

	& > div {
		position: absolute;
		top: 50%;
		right: 50%;
		transform: translate(50%, -50%);
		text-align: center;
		min-width: 400px;

		h1 {
			font-size: 22px;
			margin: 16px 0;
			max-width: 400px;
		}

		button {
			font-size: 16px;
			margin-top: 8px;
			color: var(--white-hover);
			background-color: transparent;
			border: 2px solid;
			border-color: var(--white-hover);
			border-radius: 6px;
			padding: 8px 20px;
			transition: 0.2s all;
			cursor: pointer;

			&:hover {
				color: var(--white);
				border-color: var(--white);
			}
		}
	}
`;

const Redirection: React.FC = () => {
	return (
		<Container>
			<div>
				<Image src="/access.svg" width="150px" height="150px" />
				<h1>Você será redirecionado em instantes...</h1>
				<p>Se isso não acontecer</p>
				<Link href="/login" passHref>
					<button>Voltar para o início</button>
				</Link>
			</div>
		</Container>
	);
};

export default Redirection;
