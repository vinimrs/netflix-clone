import { IMovieDataInfo, IMovieHomeList, IMovieVideo } from '@types';
import { selector } from 'recoil';
import { moviesService } from '@services';
import { shuffle } from '@utils';
import { profileAtom } from '../atoms';

export const homeMovieListAsync = selector<IMovieHomeList[]>({
	key: 'homeMovieListAsync',
	get: async ({ get }) => {
		const profile = get(profileAtom);

		const resultList = await moviesService.getHomeList(profile);
		const fixedLists = await moviesService.getFixedHomeLists();
		const lists = [...resultList, ...fixedLists];
		let res = await Promise.all(
			lists.map(async item => {
				return { ...item, items: item.items.body };
			})
		);
		res = shuffle(res);
		return res;
	},
});

const isAnMovieDataInfo = (obj: any): obj is IMovieDataInfo => {
	return (
		'backdrop_path' in obj &&
		obj.backdrop_path !== null &&
		'overview' in obj &&
		obj.overview !== null &&
		'title' in obj &&
		obj.title !== null &&
		'vote_average' in obj &&
		obj.vote_average !== null &&
		'genre_ids' in obj &&
		obj.genre_ids !== null
	);
};

export const heroFilmAsync = selector<{
	video: IMovieVideo;
	heroFilm: IMovieDataInfo;
}>({
	key: 'heroFilm',
	get: async ({ get }) => {
		const profile = get(profileAtom);

		const randomId =
			profile?.preference[
				Math.floor(Math.random() * profile?.preference.length)
			];

		const resp = await moviesService.getMovieListByGenre(randomId);
		if (resp.length > 0) {
			const completedFilms = resp.filter(film => {
				return isAnMovieDataInfo(film);
			});
			const randomChosen = Math.floor(
				Math.random() * (completedFilms.length - 1)
			);
			const chosen = completedFilms[randomChosen];
			const chosenInfo = await moviesService.getMovieInfo(chosen.id);
			const videos = await moviesService.getMovieVideos(chosen.id);

			return { video: videos[0], heroFilm: chosenInfo };
		}
	},
});
