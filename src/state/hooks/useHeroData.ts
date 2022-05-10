import { IMovieDataInfo, IMovieVideo } from '@types';
import { useRecoilValueLoadable } from 'recoil';
import { heroFilmAsync } from '../selectors';

export const useHeroData = () => {
	return useRecoilValueLoadable<{
		video: IMovieVideo;
		heroFilm: IMovieDataInfo;
	}>(heroFilmAsync);
};
