import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { loadFilms, setFilms, setStatus } from '../reducers/films';
import { moviesService } from '@services';
import { isAnMovieDataInfo } from '@utils';

const filmsWorker = function* () {
	yield put(setStatus('loading'));

	try {
		const [general, specific, hero] = yield all([
			call(generalFilmsWorker),
			call(profileFilmsWorker),
			call(heroFilmWorker),
		]);

		yield put(setFilms({ general, specific, hero }));
		yield put(setStatus('success'));
	} catch (error) {
		console.log('filmsWorker -> error', error);
		yield put(setStatus('failed'));
	}
};

const profileFilmsWorker = function* () {
	const profile = yield select(state => state.profile);

	if (!profile?.name) return;

	console.log('profileFilmsWorker -> profile', profile);
	const resultList = yield call(moviesService.getHomeList, profile);
	const res = yield Promise.all(
		resultList.map(async item => {
			return { ...item, items: item.items.body };
		}),
	);
	console.log('profileFilmsWorker -> res', res);
	return res;
};

const generalFilmsWorker = function* () {
	const list = yield call(moviesService.getFixedHomeLists);
	const res = yield Promise.all(
		list.map(async item => {
			return { ...item, items: item.items.body };
		}),
	);

	console.log('generalFilmsWorker -> res', res);

	return res;
};

const heroFilmWorker = function* () {
	const profile = yield select(state => state.profile);

	if (!profile?.name) return;

	const randomId =
		profile?.preference![
			Math.floor(Math.random() * profile?.preference!.length)
		];

	const resp = yield call(moviesService.getMovieListByGenre, randomId);

	if (resp.length > 0) {
		const completedFilms = resp.filter(film => {
			return isAnMovieDataInfo(film);
		});
		const randomChosen = Math.floor(
			Math.random() * (completedFilms.length - 1),
		);
		const chosen = completedFilms[randomChosen];
		const [chosenInfo, videos] = yield all([
			call(moviesService.getMovieInfo, chosen.id!),
			call(moviesService.getMovieVideos, chosen.id!),
		]);

		return { video: videos[1] ? videos[1] : videos[0], heroFilm: chosenInfo };
	}
};

export const filmsSaga = function* () {
	yield takeLatest(loadFilms, filmsWorker);
};

