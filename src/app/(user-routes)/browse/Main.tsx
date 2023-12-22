'use client';
import { useHomeList, useProfile } from '@hooks';
import React, { useEffect, useState } from 'react';

import * as S from '../../../styles/GlobalComponents';
import { IMovieData, IMovieHomeList } from '@types';
import List from 'src/components/List';
import Loading from 'src/components/Loading';
import { useLoading } from 'src/state/hooks/useLoading';

interface Modal {
	setModal: (film: IMovieData) => void;
}

const Main: React.FC<Modal> = ({ setModal }) => {
	const [list, setList] = useState<IMovieHomeList[]>([]);
	const { setLoading } = useLoading();
	const { profile } = useProfile();
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

