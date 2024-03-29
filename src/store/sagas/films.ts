import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { loadFilms, setFilms, setStatus } from '../reducers/films';
import { moviesService } from '@services';
import { isAnMovieDataInfo } from '@utils';
import { changeProfile } from '../reducers/profile';

const filmsWorker = function* () {
	const status = yield select(state => state.films.status);
	if (status !== 'changingProfile') yield put(setStatus('loading'));

	try {
		const [general, specific, hero] = yield all([
			call(generalFilmsWorker),
			call(profileFilmsWorker),
			call(heroFilmWorker),
		]);

		yield put(setFilms({ general, specific, hero }));
		yield put(setStatus('success'));
	} catch (error) {
		yield put(setStatus('failed'));
	}
};

const profileFilmsWorker = function* () {
	const profile = yield select(state => state.profile);

	if (!profile?.name) return;

	const resultList = yield call(moviesService.getHomeList, profile);
	const res = yield Promise.all(
		resultList.map(async item => {
			return { ...item, items: item.items.body };
		}),
	);
	return res;
};

const generalFilmsWorker = function* () {
	const list = yield call(moviesService.getFixedHomeLists);
	const res = yield Promise.all(
		list.map(async item => {
			return { ...item, items: item.items.body };
		}),
	);

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

		return { video: videos[0], heroFilm: chosenInfo };
	}
};

const profileChangeWorker = function* () {
	yield put(setStatus('changingProfile'));
};

export const filmsSaga = function* () {
	yield takeLatest(changeProfile, profileChangeWorker);
	yield takeLatest(loadFilms, filmsWorker);
};

