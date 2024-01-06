'use client';
import React, { useMemo } from 'react';

import * as S from '../../../styles/GlobalComponents';
import { IMovieData } from '@types';
import List from 'src/components/List';
import { useAppSelector } from 'src/store/hooks';
import { shuffle } from '@utils';
import ListShimmer from 'src/components/List/Shimmer';

interface Modal {
	setModal: (film: IMovieData) => void;
}

const Main: React.FC<Modal> = ({ setModal }) => {
	const {
		data: { general, specific },
	} = useAppSelector(state => state.films);

	const homeList = useMemo(
		() => shuffle([...general, ...specific]),
		[general, specific],
	);

	return (
		<S.MainWrapper>
			{homeList?.length > 0 ? (
				homeList.map((category, key) => {
					return <List key={key} setModal={setModal} list={category} />;
				})
			) : (
				<>
					<ListShimmer />
					<ListShimmer />
				</>
			)}
		</S.MainWrapper>
	);
};

export default Main;

