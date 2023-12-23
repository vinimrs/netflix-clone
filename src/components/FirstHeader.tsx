'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
	width: 100vw;
	height: 80px;
	padding: 0px 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		padding: 0px 40px;
	}
`;

const FirstHeader: React.FC = () => {
	return (
		<HeaderDiv>
			<Image
				alt="Logo da Netflix"
				src="/netflix-logo.svg"
				width="150"
				height="100"
				// style={{ display: 'flex', justifyContent: 'start' }}
			/>
			<Link href={'/login'} passHref>
				<button style={{ backgroundColor: 'red' }}>Entrar</button>
			</Link>
		</HeaderDiv>
	);
};

export default FirstHeader;
