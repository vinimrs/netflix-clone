import { IMovieHomeList } from '@types';
import { useRecoilValueLoadable } from 'recoil';
import { homeMovieListAsync } from '../selectors';

export const useHomeList = () => {
	return useRecoilValueLoadable<IMovieHomeList[]>(homeMovieListAsync);
};
