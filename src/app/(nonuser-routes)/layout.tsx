'use client';
import React from 'react';
import FirstHeader from '../../components/FirstHeader';
import * as S from './styles';
import { Children } from '@types';

const NonUserLayout: React.FC<Children> = ({ children }) => {
	return (
		<S.CustomBackground src="/netflix-library.jpg">
			<FirstHeader />
			{children}
		</S.CustomBackground>
	);
};

export default NonUserLayout;

