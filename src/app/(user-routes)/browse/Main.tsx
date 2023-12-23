'use client';
import { useHomeList } from '@hooks';
import React from 'react';

import * as S from '../../../styles/GlobalComponents';
import { IMovieData, IMovieHomeList } from '@types';
import List from 'src/components/List';

interface Modal {
	setModal: (film: IMovieData) => void;
}

const Main: React.FC<Modal> = ({ setModal }) => {
	const homeList = useHomeList().getValue();

	return (
		<S.MainWrapper>
			{homeList.map((category, key) => {
				return <List key={key} setModal={setModal} list={category} />;
			})}
		</S.MainWrapper>
	);
};

export default Main;

