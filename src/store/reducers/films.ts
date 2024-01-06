import { createAction, createSlice } from '@reduxjs/toolkit';
import { IHeroMovieData, IMovieData, IMovieHomeList } from '@types';

const initialState: {
	data: {
		general: IMovieHomeList[];
		specific: IMovieHomeList[];
		hero: IHeroMovieData;
	};
	status: 'idle' | 'loading' | 'failed' | 'success' | 'changingProfile';
} = {
	data: {
		general: [],
		specific: [],
		hero: { heroFilm: {} as IMovieData, video: {} },
	},
	status: 'idle',
};

export const loadFilms = createAction('films/loadFilms');
// export const loadEspecificLists = createAction('films/loadEspecificLists');

const filmsListSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		setFilms: (state, action) => {
			return {
				...state,
				data: action.payload,
			};
		},
		setStatus: (state, action) => {
			return {
				...state,
				status: action.payload,
			};
		},
		resetFilmsList: () => initialState,
		removeSpecificFilms: state => {
			return {
				...state,
				specific: [],
				hero: {} as IHeroMovieData,
			};
		},
	},
});

export const { resetFilmsList, removeSpecificFilms, setFilms, setStatus } =
	filmsListSlice.actions;

export default filmsListSlice.reducer;

