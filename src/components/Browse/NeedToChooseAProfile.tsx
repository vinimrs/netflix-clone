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
			font-size: 24px;
			margin: 8px 0 16px 0;
		}

		button {
			font-size: 18px;
			margin-top: 20px;
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

const NeedToChooseAProfile: React.FC = () => {
	return (
		<Container>
			<div>
				<Image src="/box-red.svg" width="160px" height="160px" />
				<h1>Nenhum perfil escolhido...</h1>
				<p>
					Você precisa <strong>escolher o seu perfil!</strong>
				</p>
				<Link href="/select-profile" passHref>
					<button>Selecionar perfil</button>
				</Link>
			</div>
		</Container>
	);
};

export default NeedToChooseAProfile;
