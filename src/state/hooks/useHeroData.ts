import { IHeroMovieData } from '@types';
import { useRecoilValueLoadable } from 'recoil';
import { heroFilmAsync } from '../selectors';

export const useHeroData = () => {
	return useRecoilValueLoadable<IHeroMovieData>(heroFilmAsync);
};
