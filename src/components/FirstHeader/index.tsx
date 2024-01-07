'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import * as S from './style';

const FirstHeader: React.FC = () => {
	return (
		<S.HeaderDiv>
			<Image
				alt="Logo da Netflix"
				src="/netflix-logo.svg"
				width="150"
				height="100"
				// style={{ display: 'flex', justifyContent: 'start' }}
			/>
			<Link href={'/login'} passHref>
				<S.HeaderLoginButton>Entrar</S.HeaderLoginButton>
			</Link>
		</S.HeaderDiv>
	);
};

export default FirstHeader;

