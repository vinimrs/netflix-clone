'use client';
import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
	position: absolute;
	z-index: 900;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #000;

	img {
		width: 40vw;
	}
`;

const Loading: React.FC = () => {
	return (
		<LoadingContainer>
			<img src="/loading1.gif" alt="Animação de carregamento" />
		</LoadingContainer>
	);
};

export default Loading;

